import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { UserInputDTO } from "../types/DTO/userInputDTO";
import { LoginInputDTO } from "../types/DTO/loginInputDTO";


export default class UserController {
  constructor(
    private userBusiness: UserBusiness,
  ) {}

  public signUp = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const input: UserInputDTO = {
      name,
      email,
      password,
      role
    };
    try {
      const auth = await this.userBusiness.signUp(input);
      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso.", auth: auth });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const input: LoginInputDTO = {
      email,
      password,
    };

    try {
      const auth = await this.userBusiness.login(input);
      res
        .status(200)
        .send({ message: "Login efetuado com sucesso.", auth: auth });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}