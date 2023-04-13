import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
    schoolName: string;
    firstName: string;
    lastName: string;
    height: string;
    matriculNumber: string;
    class: string;
    address: string;
    inscriptionDroit?: string;
    deleted: boolean;
    isPrive: boolean;
    isEtat: boolean;
    photo: string;
    // blackList: string;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    transform: any;
    urlPlus?: string;
}

//Create Schema
const StudentSchema: Schema = new Schema({
    schoolName: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    height: {
        type: String,
        required: false,
    },
    matriculNumber: {
        type: String,
        required: false,
    },
    class: {
        type: String,
        required: false,
    },
    inscriptionDroit: {
        type: String,
        // required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    deleted: {
        type: Boolean,
        required: false,
    },
    isPrive: {
        type: Boolean,
        required: false,
    },
    isEtat: {
        type: Boolean,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    // blackList: {
    //     type: Boolean,
    //     default: false,
    //     required: false,
    //   },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: false,
    },
    updatedBy: {
        type: mongoose.Types.ObjectId,
    },
    deletedBy: {
        type: mongoose.Types.ObjectId,
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
    }
});

StudentSchema.method("transform", function () {
    const obj = this.toObject();
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const Student = mongoose.model<IStudent>("Student", StudentSchema);
