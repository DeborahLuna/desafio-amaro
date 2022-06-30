import UserBusiness from "../src/business/UserBusiness";
import { CustomError } from "../src/errors/CustomError";
import { HashManagerMock } from "./mocks/hashManagerMock";
import { IdGeneratorMock } from "./mocks/idGeneratorMock";
import { AuthenticatorMock } from "./mocks/AuthenticatorMock";
import UserDatabaseMock from "./mocks/UserDatabaseMock";
import { UserInputDTO } from "../src/types/DTO/userInputDTO";
import { userMock1, userMock2, userMock3 } from "./mocks/userMock";

 
 const userBusinessMock = new UserBusiness(
     new UserDatabaseMock() as any,
     new IdGeneratorMock(),
     new AuthenticatorMock() as any,
     new HashManagerMock()
 )
 
 describe("Teste de signUp", () => {
     test("Erro que deve retornar quando o nome está vazio", async () => {
         expect.assertions
         try {
            const input1: UserInputDTO = {
                name:"",
                email: "teste1@teste.com",
                password: "Teste@1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input1)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Favor preencher todos os campos.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando o email é inválido", async () => {
         expect.assertions
         try {
            const input2: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@.testecom",
                password: "Teste@1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input2)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Formato de email inválido.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando a senha é inválida", async () => {
         expect.assertions
         try {
            const input3: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@teste.com",
                password: "1234",
                role: "admin"
            }
             await userBusinessMock.signUp(input3)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Senhas devem ter pelo menos 9 caracteres, conter um dígito, uma letra minúscula, uma maiúscula e pelo menos um dos seguintes caracteres especiais: '$', '*', '&', '@' e/ou '#'.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando o tipo de usuário é inválido", async () => {
         expect.assertions
         try {
            const input3: UserInputDTO = {
                name:"Teste 01",
                email: "teste1@teste.com",
                password: "Teste@1234",
                role: "adm"
            }
             await userBusinessMock.signUp(input3)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Tipo de usuário inválido.")
                 expect(error.statusCode).toEqual(422)
             } else {
                 console.log(error)
             }
         }
     })
     test("Sucesso no cadastro", async () => {
         expect.assertions
         try {
            const input4: UserInputDTO = {
            name:"Teste 01",
            email: "teste1@teste.com",
            password: "Teste@1234",
            role: "admin"
        }

        await userBusinessMock.signUp(input4)

         } catch (error) {
             console.log(error)
         }
     })
 });
 
 describe("Teste de login", () => {
     test("Erro que deve retornar quando o email fornecido não existe", async () => {
         expect.assertions
         try {
             const input1 = {
                 email: "bla@teste.com",
                 password: "User@1234"
             }
             await userBusinessMock.login(input1)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Este usuário não está cadastrado.")
                 expect(error.statusCode).toEqual(404)
             } else {
                 console.log(error)
             }
         }
     })
     test("Erro que deve retornar quando a senha está errada", async () => {
         expect.assertions
         try {
            const input2 = {
                email: "user01@teste.com",
                password: "Teste@1234"
            }
             await userBusinessMock.login(input2)
         } catch (error) {
             if (error instanceof CustomError) {
                 expect(error.message).toEqual("Email ou senha incorretos.")
                 expect(error.statusCode).toEqual(403)
             } else {
                 console.log(error)
             }
         }
     })
     test("Sucesso no login e verificação do token de acesso", async () => {
         expect.assertions
         try {
            const input3 = {
                email: "user01@teste.com",
                password: "User@1234"
            }
             const result = await userBusinessMock.login(input3)
             expect(result).toEqual({ 
             "name": "User 01",
             "token": "token_mockado" })
         } catch (error) {
             console.log(error)
         }
     })
 });
