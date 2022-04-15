import { Schema, model } from 'mongoose';

const FileSchema = new Schema({
  filename: String,
  size: Number,
  ext: String,
  url: String,
  // marker: { type: Schema.Types.ObjectId, ref: 'Marker', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const FileModel = model('File', FileSchema);

export default FileModel;
