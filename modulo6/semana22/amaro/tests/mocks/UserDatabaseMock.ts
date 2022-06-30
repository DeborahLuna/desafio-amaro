import { userMock1, userMock2, userMock3 } from "./userMock";
import User from "../../src/model/User";

export default class UserDatabaseMock {
  insert = async (user: User): Promise<void> => {};

  getAllUsers = async (): Promise<User[]> => {
    const result = [userMock1, userMock2, userMock3]
    return result;
  }

  getUserByEmail = async (email: string): Promise<User | undefined> => {
    if (email === 'user01@teste.com') {
        return userMock1
    } else if (email === 'user02@teste.com') {
        return userMock2
    } else if (email === 'user03@teste.com') {
        return userMock3
    }
    return undefined
  };
  
}
