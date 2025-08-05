import { Document, model, Schema } from 'mongoose'

export interface UserDocument extends Document {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  email: { required: true, type: String, unique: true },
  firstName: { required: true, type: String },
  lastName: { required: true, type: String },
  password: { required: true, select: false, type: String },
});

const User = model<UserDocument>("User", userSchema);

export default User;
