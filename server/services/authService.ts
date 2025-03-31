import { pool } from "../config/db";
import PasswordHasher from "../utils/passwordHasher";

export default class AuthService {
  static async createUser(login: string, email: string, password: string, mailing: string) {
    try {
      const hashedPassword = await PasswordHasher.hashPassword(password);
      const result = await pool.query(
        `INSERT INTO "Users" (login, email, password, mailing)
                 VALUES ($1, $2, $3, $4)
                 RETURNING login, email`,
        [login, email, hashedPassword, mailing]
      );
    } catch (err: any) {
      if (err.code === "23505") {
        throw {
          status: 409,
          message: "User with this email/login already exists",
        };
      }
      throw {
        status: 502,
        message: "Database operation failed",
        details: err,
      };
    }
  }

  static async authorizeUser(loginOrEmail: string, password: string) {
    try {
      const result = await pool.query(
        `SELECT password FROM "Users" WHERE login = $1 OR email = $1`,
        [loginOrEmail]
      );
      const hashedPassword = result.rows[0]?.password;
      console.log(loginOrEmail, password);
      console.log(hashedPassword)
      const credentials = await PasswordHasher.checkPassword(password, hashedPassword);
      if (credentials) {
        return {
          success: true,
          user: result.rows[0].login,
        };
      } else {
        return {
          success: false,
          error: "Invalid credentials",
        };
      }
    } catch (error) {
      console.error("Database error:", error);
      return {
        success: false,
        error: "Database error",
      };
    }
  }
}
