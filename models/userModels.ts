import mongoose, { Document } from "mongoose";

export interface IUsers extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  email: String;
  name: String;
  password: String;
  age: Number;
}

const userAuthSchema = new mongoose.Schema<IUsers>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    }
  }
);


const User = mongoose.model<IUsers>(
  "User",
  userAuthSchema
);

export default User;