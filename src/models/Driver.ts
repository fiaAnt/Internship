import mongoose from "mongoose";
import { IHATEOASLinks } from "./Scooter";
const { Schema } = mongoose;

export interface IDriver extends mongoose.Document {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    createdAt: Date;
    updatedAt: Date;
    links?: IHATEOASLinks;
}

const driverSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    licenseNumber: {
        type: String,
        trim: true
    },
    creditCards: [{
        number: String,
        owner: String,
        validThrough: Date,
        isDefault: { type: Boolean, default: false }
    }]
}, {
    timestamps: true
});

export const DriverModel = mongoose.model<IDriver>('Driver', driverSchema);