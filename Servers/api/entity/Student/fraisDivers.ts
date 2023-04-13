import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "../Student";

export interface IFraisDivers extends Document {
    student: any;
    matriculNumber:string,
    frais: string;
    datePayDivers: Date;
    transform: any;
    isFrais: boolean;
}


//Create Schema
const FraisDiversSchema: Schema = new Schema({
    student: {
        type: String,
        required: false,
    },
    matriculNumber: {
        type: String,
        required: false,
    },
    frais: {
        type: String,
        required: false,
    },
    datePayDivers: {
        type: Date,
        required: false,
    },

    isFrais: {
        type: Boolean,
        required: false,
    },
   
});

FraisDiversSchema.method("transform", function () {
    const obj = this.toObject();
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const FraisDivers = mongoose.model<IFraisDivers>("FraisDivers", FraisDiversSchema);
