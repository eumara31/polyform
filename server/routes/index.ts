import { Router } from "express";
import AuthController from "../controllers/authController";
import AccountController from "../controllers/accountController";
import { requireAuth } from "../middleware/authMiddleware";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __parentdir = path.dirname(__dirname)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __parentdir + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({storage});

const router = Router();

router.post("/auth/signup", AuthController.signup);
router.post("/auth/login", AuthController.login);
router.post("/auth/logout", AuthController.logout);
router.get("/account/info", requireAuth, AccountController.getAccountInfo);
router.get(
  "/account/info/asCookies",
  requireAuth,
  AccountController.getAccountInfoAsCookies
);
//require auth не рабоатет после первой отправки файла
router.post(
  "/account/model/upload",
  upload.fields([
    { name: 'model', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ]),
  AccountController.uploadUserModel
);

export default router;
