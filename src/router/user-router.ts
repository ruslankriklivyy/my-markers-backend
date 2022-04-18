import { Router } from 'express';
import UserController from '../controllers/user-controller';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth-middleware';

const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  UserController.registration,
);
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 32 }),
  UserController.login,
);
router.post('/logout', UserController.logout);

router.get('/refresh', UserController.refresh);
router.get('/activate/:link', UserController.activate);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/user', authMiddleware, UserController.getCurrentUser);

export default router;
