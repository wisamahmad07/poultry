import mongoose, { Schema, Model, Document } from "mongoose";

export interface PoultryUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
}

const UserSchema: Schema<PoultryUser> = new Schema<PoultryUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<PoultryUser> =
  mongoose.models.User || mongoose.model<PoultryUser>("User", UserSchema);

export default User;
