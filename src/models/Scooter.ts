import mongoose from "mongoose";
const { Schema } = mongoose

export interface IScooter extends mongoose.Document {
    ssn: string;
    productionInfo: IProductionInfo;
    status: 'Free' | 'Reserved' | 'In use' | 'Unavailable' | 'In Service';
    chargeLevel: number;
    currentRun?: ICurrentRun | null;
    location: ILocation;
    bookingsHistory: IBooking[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ICreditCard {
    number: string;
    owner: string;
    validThrough: Date;
}

export interface IDriver {
    id: string;
    firstName: string;
    lastName: string;
    creditCard: ICreditCard;
}

export interface ICurrentRun {
    startDate: Date;
    driver: IDriver;
    startChargeLevel: number;
    startMileage: number;
}

export interface IBooking extends ICurrentRun {
    finishChargeLevel: number;
    finishMileage: number;
    endDate: Date;
}

export interface IProductionInfo {
    brand: string;
    model?: string;
    date?: Date;
}

export interface ILocation {
    type: 'Point';
    coordinates: [number, number];
}

const scooterSchema = new Schema({
    ssn: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    productionInfo: {
        brand: {
            type: String,
            required: true
        },
        model: String,
        date: Date
    },
    status: {
        type: String,
        enum: ['Free', 'Reserved', 'In use', 'Unavailable', 'In Service'],
        default: 'Free'
    },
    chargeLevel: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    currentRun: {
        startDate: Date,
        driver: {
            id: String,
            firstName: String,
            lastName: String,
            creditCard: {
                number: String,
                owner: String,
                validThrough: Date
            }
        },
        startChargeLevel: Number,

        startMileage: Number
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },

    bookingsHistory: [{
        startDate: Date,
        driver: {
            id: String,
            firstName: String,
            lastName: String,
            creditCard: {
                number: String,
                owner: String,
                validThrough: Date
            }
        },
        startChargeLevel: Number,
        startMileage: Number,

        finishChargeLevel: Number,
        finishMileage: Number,
        endDate: Date
    }]
}, {
    timestamps: true
});

export const ScooterModel = mongoose.model<IScooter>('Scooter', scooterSchema)

