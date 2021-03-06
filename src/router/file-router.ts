import { Router } from 'express';
import multer from '../core/multer';
import FileController from '../controllers/file-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = Router();

router.post(
  '/files',
  authMiddleware,
  multer.single('file'),
  FileController.create,
);

router.delete('/files/:id', authMiddleware, FileController.delete);

export default router;
