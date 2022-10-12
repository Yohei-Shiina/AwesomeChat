import mongoose, { Schema, Document, Model, models } from "mongoose"; 

import { IUser } from '~/types/user';

export interface UserDocument extends Document {
  id: string // Not MongoDB ObjectId
  name: string
  email: string
  image: string
}

export interface UserModel extends Model<UserDocument> {
  isExist: (id: string) => Promise<boolean>
  signIn: (user: IUser) => Promise<void>
}

const UserSchema = new Schema<IUser>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
});

export default models.User 
  ? (models.User as UserModel) 
  : mongoose.model<UserDocument, UserModel>('User', UserSchema);