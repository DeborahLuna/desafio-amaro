import UserDatabase from "../data/UserDatabase";
import User from "../model/User";
import  Authenticator  from "../services/Authenticator";
import  HashManager  from "../services/HashManager";
import  IdGenerator  from "../services/IdGenerator";
import { LoginInputDTO } from "../types/DTO/loginInputDTO";
import { UserInputDTO } from "../types/DTO/userInputDTO";
import { CustomError } from "../errors/CustomError";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager
  ) {}

  signUp = async (input: UserInputDTO): Promise<any> => {
    try {
      const { name, email, password, role } = input;
      
      if (role !== "admin" && role !== "normal") {
        throw new CustomError(422, "Tipo de usuário inválido.");
      }
      
      const newRole = User.stringToUserRole(role);


      if (!name || !email || !password || !newRole) {
        throw new CustomError(422, "Favor preencher todos os campos.");
      }

      const validEmailVerifier: RegExp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

      const isEmailValid = validEmailVerifier.test(email);

      if (!isEmailValid) {
        throw new CustomError(422, "Formato de email inválido.");
      }

      const validPasswordVerifier: RegExp =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{9,}$/;
      const isPasswordValid = validPasswordVerifier.test(password);

      if (!isPasswordValid) {
        throw new CustomError(
          422,
          "Senhas devem ter pelo menos 9 caracteres, conter um dígito, uma letra minúscula, uma maiúscula e pelo menos um dos seguintes caracteres especiais: '$', '*', '&', '@' e/ou '#'."
        );
      }

      const registeredUser = await this.userDatabase.getUserByEmail(email);
      if (registeredUser) {
        throw new CustomError(422, "Email já cadastrado.");
      }

      const id = this.idGenerator.generateId();
      const hashPassword = await this.hashManager.hash(password);

      const newUser = new User(
        id,
        name,
        email,
        hashPassword,
        User.stringToUserRole(role)
      );
      await this.userDatabase.insert(newUser);

      const token = this.authenticator.generateToken({ id, role });

      const auth = { token, name, role };

      return auth;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  login = async (input: LoginInputDTO) => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(422, "Favor informar email e senha.");
      }

      const registeredUser = await this.userDatabase.getUserByEmail(email);
      if (!registeredUser) {
        throw new CustomError(404, "Este usuário não está cadastrado.");
      }
      const passwordIsCorrect = await this.hashManager.compare(
        password,
        registeredUser.password
      );

      if (!passwordIsCorrect) {
        throw new CustomError(403, "Email ou senha incorretos.");
      }

      const name = registeredUser.name;

      const token = this.authenticator.generateToken({
        id: registeredUser.id,
        role: registeredUser.role
      });

      const auth = { token, name };

      return auth;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}