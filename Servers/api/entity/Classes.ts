import mongoose, { Schema, Document } from "mongoose";
import { IProfessor, Professor } from "../entity/Professor";


export interface IClasse extends Document {
    className: string;
    schoolName: string;
    horror: string;
    nomHorror:string,
    nomDay:string,
    day: string;
    prof: IProfessor;
    deleted: boolean;
    isArchive: boolean;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}

// Create Schema
const ClassesSchema: Schema = new Schema({

    className: {
        type: String,
        required: false,
    },
    schoolName: {
        type: String,
        required: false,
    },
    horror: {
        type: String,
        required: false,
    },
    nomHorror: {
        type: String,
        required: false,
    },
    day: {
        type: String,
        required: false,
    },
    nomDay: {
        type: String,
        required: false,
    },
    prof: {
        // type: mongoose.Schema.Types.ObjectId,
        type: mongoose.Schema.Types.Mixed,
        required: false,
        // ref: 'Professor',
    },
 
    deleted: {
        type: Boolean,
        default: false,
    },
    isArchive: {
        type: Boolean,
        default: false,
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
ClassesSchema.method("transform", function () {
    const obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});

export const Classe = mongoose.model<IClasse>("Classes", ClassesSchema);
