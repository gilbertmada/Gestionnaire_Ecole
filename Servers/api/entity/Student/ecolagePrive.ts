import mongoose, { Schema, Document } from "mongoose";
import { IStudent } from "../Student";

export interface IEcolagePrive extends Document {
    student: any;
    matriculNumber:string,
    ecolage: string;
    datePayEcolage: Date ;
    ecolageMonth: string;
    transform: any;
    isEcolage: boolean;
}


//Create Schema
const EcolagePriveSchema: Schema = new Schema({
    student: {
        type: String,
        required: false,
    },
    matriculNumber: {
        type: String,
        required: false,
    },
    ecolage: {
        type: String,
        required: false,
    },
    ecolageMonth: {
        type: String,
        required: false,
    },
    datePayEcolage: {
        type: Date,
        required: false,
    },

    isEcolage: {
        type: Boolean,
        required: false,
    },

});

EcolagePriveSchema.method("transform", function () {
    const obj = this.toObject();
    obj.id = obj._id;
    // delete obj._id;

    return obj;
});

export const EcolagePrive = mongoose.model<IEcolagePrive>("EcolagePrive", EcolagePriveSchema);
