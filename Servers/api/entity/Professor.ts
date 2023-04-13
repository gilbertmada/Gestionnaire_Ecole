import mongoose, { Schema, Document } from "mongoose";

export interface IProfessor extends Document {
  _id?: string;
  IM: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  nomRole:string;
  deleted: boolean;
  isArchive: boolean;
  password: string;
  photo: string;
  matiere: string;
  createdBy: string;
  updatedBy: string;
  deletedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  transform: any;
  urlPlus?: string;
}

// Create Schema
const ProfessorSchema: Schema = new Schema({
  lastName: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    default: "ADMIN",
  },
  nomRole: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  IM: {
    type: String,
    required: false,
  },
  matiere: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  isArchive: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
  urlPlus: {
    type: String,
    required: false,
  },
});

ProfessorSchema.method("transform", function () {
  const obj = this.toObject();

  //Rename fields
  obj.id = obj._id;
  // delete obj._id;

  return obj;
});

export const Professor = mongoose.model<IProfessor>("Professor", ProfessorSchema);
