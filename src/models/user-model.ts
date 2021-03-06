import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, required: true, default: false },
  activationLink: { type: String },
});

const UserModel = model('User', UserSchema);

export default UserModel;
