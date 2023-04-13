import mongoose, { Schema, Document } from "mongoose";

export interface IPasswordReinit extends Document {
  email: string;
  hash: string;
  code: string;
  createdAt: Date;
  user: any;
  transform: any;
}

// Create Schema
const PasswordReinitSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  },
});

PasswordReinitSchema.method('transform', function () {
  const obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  // delete obj._id;
  return obj;
});

export const PasswordReinit = mongoose.model<IPasswordReinit>("PasswordReinit", PasswordReinitSchema);
