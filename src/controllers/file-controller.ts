import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api-error';
import FileService from '../service/file-service';

class FileController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const file = req.file;
      const { markerId } = req.query;

      try {
        const uploadFile = await FileService.create(
          file,
          userId,
          markerId?.toString(),
        );

        return res.status(200).json(uploadFile);
      } catch (error) {
        return ApiError.BadRequest('File not uploaded');
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const fileId = req.params.id;
      const fileName = await FileService.delete(fileId);

      return res.status(200).json({ message: `File ${fileName} was deleted` });
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
