import { pool } from "../config/db";
import { hashPassword, checkPassword } from "../utils/passwordHasher";

export default class AuthService {
  static async createUser(login: string, email: string, password: string) {
    try {
      const result = await pool.query(
        `INSERT INTO "Users" (login, email, password)
                 VALUES ($1, $2, $3)
                 RETURNING login, email`,
        [login, email, hashPassword(password)]
      );
      console.log(
        `Created user: ${result.rows[0].login}, ${result.rows[0].email}`
      );
    } catch (err: any) {
      console.log(login, email, password);
      console.log(err);
      if (err.code === "23505") {
        throw {
          status: 409,
          message: "User with this email/login already exists",
        };
      }
      throw {
        status: 501,
        message: "Database operation failed",
        details: err.message,
      };
    }
  }

  static async authorizeUser(loginOrEmail: string, password: string) {
    try {
      const result = await pool.query(
        `SELECT id, username, email 
    FROM users
    WHERE (login = $1 OR email = $1)
    AND password = crypt($2, password)
    LIMIT 1;`,
        [loginOrEmail, hashPassword(password)]
      );

      if (result.rows[0]) {
        return {
          success: true,
          user: result.rows[0],
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
