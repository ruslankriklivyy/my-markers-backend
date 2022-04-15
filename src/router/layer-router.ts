import { Router } from 'express';
import { body } from 'express-validator';
import LayerController from '../controllers/layer-controller';
import { authMiddleware } from '../middleware/auth-middleware';

const router = Router();

router.get('/layers', LayerController.getAll);

router.post(
  '/layers/create',
  authMiddleware,
  body('name').isLength({ max: 76 }),
  body('type').isIn(['public', 'private']).isString(),
  LayerController.create,
);

router.put(
  '/layers/:id',
  authMiddleware,
  body('name').isLength({ max: 76 }).optional({ nullable: true }),
  body('type')
    .isIn(['public', 'private'])
    .isString()
    .optional({ nullable: true }),
  LayerController.update,
);

router.delete('/layers/:id', LayerController.remove);

export default router;
