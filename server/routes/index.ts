import { Router } from 'express';
import AuthController from '../controllers/authController';
import AccountController from '../controllers/accountController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout)
router.get('/account/info', requireAuth, AccountController.getAccountInfo);
router.get('/account/info/asCookies', requireAuth, AccountController.getAccountInfoAsCookies);


export default router;