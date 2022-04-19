import { Router } from 'express';
import { body } from 'express-validator';
import MarkerController from '../controllers/marker-controller';

const router = Router();

router.get('/markers', MarkerController.getAll);

router.post(
  '/markers/create',
  body('title').isLength({ min: 1, max: 76 }),
  body('description').isLength({ min: 1, max: 255 }),
  body('location').isObject(),
  body('location.lat').isNumeric(),
  body('location.lng').isNumeric(),
  MarkerController.create,
);

router.put(
  '/markers/:id',
  body('title').isLength({ min: 1, max: 76 }).optional({ nullable: true }),
  body('description')
    .isLength({ min: 1, max: 255 })
    .optional({ nullable: true }),
  body('location').isObject().optional({ nullable: true }),
  body('location.lat').isNumeric().if(body('location.lng').exists()),
  body('location.lng').isNumeric().if(body('location.lat').exists()),
  MarkerController.update,
);

router.delete('/markers/:id', MarkerController.remove);

export default router;
