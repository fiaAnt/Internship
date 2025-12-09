import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
    firstname: string
    lastname: string
    email: string
    projects?: mongoose.Types.ObjectId[]
}

const userSchema = new Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
})

export const UserModel = mongoose.model<IUser>('User', userSchema)