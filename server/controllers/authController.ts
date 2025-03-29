import { Request, Response } from "express";
import AuthService from "../services/authService";
import { resourceLimits } from "worker_threads";

export default class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const { login, email, password } = req.body;
      await AuthService.createUser(login, email, password);
      res.status(200).json({ msg: "Signup succesful" });
    } catch (err: any) {
      //409, если такой пользователь уже сушествует, 500 если иное
      res.status(err.status).json({ error: err });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { loginOrEmail, password } = req.body;
      const result = await AuthService.authorizeUser(loginOrEmail, password);
      if (result.success) {
        //временное решение
        res.cookie("userUniqueId", (Math.random() * 10000).toString(), {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          path: "/",
        });
        return res.status(200).json({
          success: true,
          message: "Login successful",
        });
      }

      return res.status(401).json({ 
        success: false, 
        error: "Invalid credentials" 
      });

    }  catch (err: any) {
        return res.status(err.status || 500).json({ 
          success: false, 
          error: err.message 
        });
      }
  }
}
