import { Schema, model } from 'mongoose';

const LayerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['public', 'private'], required: true },
});

const LayerModel = model('Layer', LayerSchema);

export default LayerModel;
