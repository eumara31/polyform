import { Request, Response } from "express";
import { pool } from "../config/db";

export default class AccountService {
  static async getAccountInfo(login: string) {
    try {
        const result = await pool.query(
            `SELECT login, email, mailing FROM "Users" WHERE login = $1;`,
            [login]
          );
      console.log(123)
      return result.rows;
    } catch (err: any) {
      throw {
        status: 502,
        message: "Database operation failed",
        details: err,
      };
    }
  }
  static async getPurchaseHistory() {}
  static async getUserModels() {}
  static async getDeletedUserModels() {}
  static async getModelStatistics() {}
  static async changeUserModel() {}
  static async deleteUserModel() {}
  static async restoreUserModel() {}
}
