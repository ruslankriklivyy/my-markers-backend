import { Schema, model } from 'mongoose';

const MarkerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  layer: { type: Schema.Types.ObjectId, ref: 'Layer' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  preview: {
    url: { type: String },
    _id: { type: Schema.Types.ObjectId },
  },
});

const MarkerModel = model('Marker', MarkerSchema);

export default MarkerModel;
