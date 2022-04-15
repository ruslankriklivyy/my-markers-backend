import { NextFunction, Request, Response } from 'express';
import cloudinary from '../core/cloudinary';
import FileModel from '../models/file-model';
import ApiError from '../exceptions/api-error';

class FileController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const file = req.file;

      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return ApiError.BadRequest(error?.message || 'File not uploaded');
          }

          const fileData: Pick<
            cloudinary.UploadApiResponse,
            'filename' | 'size' | 'ext' | 'url' | 'user'
          > = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
            user: userId,
          };

          const uploadFile = new FileModel(fileData);

          uploadFile
            .save()
            .then((fileObj: any) => {
              res.status(200).json({
                status: 'success',
                file: fileObj,
              });
            })
            .catch((error: any) => {
              return ApiError.BadRequest(error.message);
            });
        })
        .end(file?.buffer);
    } catch (error) {
      next(error);
    }
  }
  async delete() {}
}

export default new FileController();
