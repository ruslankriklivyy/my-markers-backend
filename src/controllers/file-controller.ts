import { NextFunction, Request, Response } from 'express';
import cloudinary from '../core/cloudinary';
import FileModel, { IUploadFile } from '../models/file-model';
import ApiError from '../exceptions/api-error';

class FileController {
  create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const file = req.file;

      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return ApiError.BadRequest(error?.message || 'File not uploaded');
          }

          const fileData = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
            user: userId,
          };

          const uploadFile = new FileModel(fileData);

          uploadFile
            .save()
            .then((uploadFileObj: IUploadFile) => {
              res.status(200).json(uploadFileObj);
            })
            .catch((error: Error) => {
              return ApiError.BadRequest(error.message);
            });
        })
        .end(file?.buffer);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const fileId = req.params.id;
      const file = await FileModel.findByIdAndRemove(fileId);
      const fileName = file.url.split('/').pop().split('.')[0];

      await cloudinary.v2.uploader.destroy(
        fileName,
        (
          error: cloudinary.UploadApiErrorResponse | undefined,
          result: cloudinary.UploadApiResponse | undefined,
        ) => {
          if (error || !result) {
            return ApiError.BadRequest(error?.message || 'File not deleted');
          }

          return res
            .status(200)
            .json({ message: `File ${fileName} was deleted` });
        },
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new FileController();
