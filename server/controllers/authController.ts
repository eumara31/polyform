import { Request, Response } from "express";
import AuthService from "../services/authService";

export default class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { login, email, password, mailing } = req.body;
      console.log(req.body);
      await AuthService.createUser(login, email, password, mailing);
      res.status(200).json({ msg: "Signup succesful" });
    } catch (err: any) {
      //409, если такой пользователь уже сушествует, 500 если иное
      res.status(err.status).json({ error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      console.log(req.body);
      const result = await AuthService.authorizeUser(login, password);
      if (result.success) {
        req.session.user = login;
        return res.status(200).json({
          success: true,
          message: "Login succesful",
        });
      }

      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    } catch (err: any) {
      return res.status(err.status || 500).json({
        success: false,
        error: err.message,
      });
    }
  }

  static async logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) return res.status(500).json({ error: "Logout failed" });
      res.clearCookie("connect.sid");
      res.json({ success: true, message: "Logged out" });
    });
  }
}
