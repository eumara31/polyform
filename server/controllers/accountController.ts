import { Request, Response } from "express";
import AccountService from "../services/accountService";

export default class AccountController {
    static async getAccountInfo(req: Request, res: Response){
        try{
            const data = await AccountService.getAccountInfo(req.session.user.login);
        } catch(err) {

        }
    }
    static async getPurchaseHistory(){

    }
    static async getUserModels(){
        
    }
    static async getDeletedUserModels(){

    }
    static async getModelStatistics(){

    }
    static async changeUserModel(){

    }
    static async deleteUserModel(){

    }
    static async restoreUserModel(){

    }
}
