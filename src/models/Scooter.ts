import mongoose from "mongoose";
const { Schema } = mongoose

export interface IScooter extends mongoose.Document {
    ssn: string;
    productionInfo: {
        brand: string;
        model?: string;
        date?: Date;
    };
    status: 'Free' | 'Reserved' | 'In use' | 'Unavailable' | 'In Service';
    chargeLevel: number;
    currentRun?: ICurrentRun | null;
    location: {
        type: 'Point';
        coordinates: [number, number];
    };
    createdAt: Date;
    updatedAt: Date;
    links?: IHATEOASLinks;
}


export interface IHATEOASLinks {
    [key: string]: ILink | undefined;
}

export interface ILink {
    href: string;
    method: string;
    description?: string;
}

export interface ICreditCard {
    number: string;
    owner: string;
    validThrough: Date;
}

export interface ICurrentRun {
    startDate: Date;
    driverId: string;
    bookingId?: string;
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
        driverId: String,
        bookingId: Schema.Types.ObjectId,
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
}, {
    timestamps: true
});

export const ScooterModel = mongoose.model<IScooter>('Scooter', scooterSchema)

