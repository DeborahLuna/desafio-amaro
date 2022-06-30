import { BaseDatabase } from "./BaseDatabase";
import User from "../model/User";

export default class UserDatabase extends BaseDatabase {
  protected TABLE_NAME = "AMARO_USERS";

  insert = async (user: User): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(user);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const [queryResult] = await this.connection(this.TABLE_NAME)
        .select("*")
        .where({ email });
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  
}