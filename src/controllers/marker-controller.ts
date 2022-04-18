import { Request, Response, NextFunction } from 'express';
import MarkerService from '../service/marker-service';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';
import { MarkerDto } from '../dtos/marker-dto';

class MarkerController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const markers = await MarkerService.getAll();
      res.status(200).json(markers);
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

      const { title, description, location, preview } = req.body;

      const marker = await MarkerService.create(
        title,
        description,
        location,
        preview,
      );

      res.status(200).json({ message: `Marker ${marker.title} was created` });
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
      const markerDto = new MarkerDto({ ...req.body });
      const marker = await MarkerService.update(id, markerDto);

      res.status(200).json({ message: `Marker ${marker.title} was updated` });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const marker = await MarkerService.remove(id);

      res.status(200).json({ message: `Marker ${marker.title} was removed` });
    } catch (error) {
      next(error);
    }
  }
}

export default new MarkerController();
