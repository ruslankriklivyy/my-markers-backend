import cloudinary from '../core/cloudinary';
import ApiError from '../exceptions/api-error';
import FileModel from '../models/file-model';

class FileService {
  create(file: any, userId: string, markerId?: string | null) {
    return new Promise((resolve, reject) =>
      cloudinary.v2.uploader
        .upload_stream({ resource_type: 'auto' }, (error, result) => {
          if (error || !result) {
            return reject(
              ApiError.BadRequest(error?.message || 'File not uploaded'),
            );
          }

          const fileData = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
            marker: markerId,
            user: userId,
          };

          if (!fileData.marker) delete fileData.marker;

          const uploadFile = new FileModel(fileData).save();
          resolve(uploadFile);
        })
        .end(file?.buffer),
    );
  }

  async delete(fileId: string) {
    const file = await FileModel.findByIdAndRemove(fileId);
    const fileName = file.url.split('/').pop().split('.')[0];

    return await cloudinary.v2.uploader.destroy(
      fileName,
      (
        error: cloudinary.UploadApiErrorResponse | undefined,
        result: cloudinary.UploadApiResponse | undefined,
      ) => {
        if (error || !result) {
          return ApiError.BadRequest(error?.message || 'File not deleted');
        }

        return fileName;
      },
    );
  }
}

export default new FileService();
