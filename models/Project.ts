import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IProject extends mongoose.Document {
    title: string
    description: string
    status: 'PLANNING' | 'ACTIVE' | 'COMPLETED'
    owner: mongoose.Types.ObjectId
    tasks?: mongoose.Types.ObjectId[]
}

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PLANNING', 'ACTIVE', 'COMPLETED'],
        required: true,
        default: 'PLANNING',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
})

export const ProjectModel = mongoose.model<IProject>('Project', projectSchema)