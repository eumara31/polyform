import { Router } from "express";
import AuthController from "../controllers/authController";
import AccountController from "../controllers/accountController";
import { requireAuth } from "../middleware/authMiddleware";
import multer from "multer";
import ProductController from "../controllers/productController";
import path from "path";
import { fileURLToPath } from "url";

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
router.get("/account/info", AccountController.getAccountInfo);
router.get(
  "/account/info/asCookies",
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
router.get("/product/:productId/description", (ProductController.getProductDescriptionById))
router.get("/product/:productId/blobs", (req, res) => {(ProductController.getProductBlobsById(req, res))})
router.get("/product/:productId/image-blobs", (req, res) => {(ProductController.getProductBlobsById(req, res, "images"))})
router.get("/product/ids", (ProductController.getProductIds))
router.post("/product/search", ProductController.getProductIdsByQuery);

export default router;
