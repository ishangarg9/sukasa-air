import mongoose, { Schema } from "mongoose";

export interface IUser {
  email: string;
  _id?: string;
}
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
});

userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
