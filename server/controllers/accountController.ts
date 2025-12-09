import { Request, Response } from "express";
import AccountService from "../services/accountService";

export default class AccountController {
  static async getAccountInfo(req: Request, res: Response) {
    try {
      const login = req.session.user?.login;
      const data = await AccountService.getAccountInfo(login);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  static async getAccountInfoAsCookies(req: Request, res: Response) {
    try {
      const sessionLogin = req.session.user?.login;
      const data = await AccountService.getAccountInfo(sessionLogin);
      const { login, email, mailing } = data[0];
      res.cookie("username", login, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("email", email, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      res.cookie("mailing", mailing, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
      return res.status(200).json({ login: login, email: email });
    } catch (err) {
      console.log(err)
      return res.status(500).json(err);
    }
  }
  static async getPurchaseHistory() {}
  static async getUserModels() {}
  static async getDeletedUserModels() {}
  static async getModelStatistics() {}
  static async uploadUserModel(req: Request, res: Response) {
    try {
      AccountService.uploadUserModel(req, res)
      res.status(200).json({ message: "Файл загружен" });
    } catch (err) {
      res.status(500).json({ error: "Ошибка загрузки файла" });
    }
  }
  static async changeUserModel() {}
  static async deleteUserModel() {}
  static async restoreUserModel() {}
}
