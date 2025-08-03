import { Schema, model, connect } from 'mongoose'

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

const User = model<IUser>('User', userSchema);

export default User;
