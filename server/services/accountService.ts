import { Request, Response } from "express";
import { pool } from "../config/db";
import multer from "multer";
import ModelCompressor from "../utils/modelCompressor";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentdir = path.dirname(__dirname)

export default class AccountService {
  static async getAccountInfo(login: string) {
    try {
      const result = await pool.query(
        `SELECT login, email, mailing FROM "Users" WHERE login = $1;`,
        [login]
      );
      console.log(123);
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
  static async uploadUserModel(req: Request, res: Response) {
    const json = JSON.parse(req.body.json);
    const file = req.file;

    console.log(json, file);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const json = JSON.parse(req.body.json);
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const baseFilePath = path.join(__parentdir, "uploads", file.filename);
      const minFilePath = path.join(
        __parentdir,
        "uploads",
        "min_" + file.filename
      );
      await ModelCompressor.createMin(baseFilePath, minFilePath);
      await pool.query(
        `INSERT INTO "Models"
        (name, description, category, tags, materials, formats, price, currency)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
        [
          json.name,
          json.description,
          json.category,
          json.tags,
          json.materials,
          json.formats,
          json.price,
          json.currency,
        ]
      );
    } catch (err) {
      // Логируем ошибку для отладки
      console.error("Database operation failed", err);

      // Бросаем ошибку, чтобы она была поймана в контроллере
      throw new Error("Database operation failed");
    }
  }
  static async changeUserModel() {}
  static async deleteUserModel() {}
  static async restoreUserModel() {}
}
