import { authenticationData } from "../../src/types/authenticationData";
import { UserRole } from "../../src/model/User";
export class AuthenticatorMock {
  public generateToken = (input: authenticationData): string => {
    return "token_mockado";
  };

  public getTokenData = (token: string): authenticationData  => {
    let userData;
    switch (token) {
      case "token_mockado":
        userData = {
          id: "id_mockado1",
          role: "admin",
        };
        break;
      case "token_mockado2":
        userData = {
          id: "id_mockado2",
          role: "normal",
        };
        break;
      case "token_mockado3":
        userData = {
          id: "id_mockado3",
          role: "normal",
        };
        break;
    }

    return userData as authenticationData;
  };
}
