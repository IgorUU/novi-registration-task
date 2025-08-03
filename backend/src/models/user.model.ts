import { Schema, model, connect } from 'mongoose'

interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);

export default User;
