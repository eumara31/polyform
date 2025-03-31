import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', AuthController.logout)

export default router;