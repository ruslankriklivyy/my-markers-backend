import { Request, Response, NextFunction } from 'express';
import LayerService from '../service/layer-service';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';

class LayerController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const layers = await LayerService.getAll();
      res.status(200).json(layers);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const userId = req.user.id;
      const { name, type } = req.body;

      const layer = await LayerService.create(name, type, userId);
      res.status(200).json({ message: `Layer ${layer.name} was created` });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const id = req.params.id;

      const layer = await LayerService.update(id, { ...req.body });

      res.status(200).json(`Layer ${layer.name} was updated`);
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const layer = await LayerService.remove(id);

      res.status(200).json({ message: `Layer ${layer.title} was removed` });
    } catch (error) {
      next(error);
    }
  }
}

export default new LayerController();
