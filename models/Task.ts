import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface ITask extends mongoose.Document {
    title: string
    description: string
    status: 'PLANNING' | 'ACTIVE' | 'COMPLETED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    project: mongoose.Types.ObjectId
    creator: mongoose.Types.ObjectId
    assignee?: mongoose.Types.ObjectId[]

}

const taskSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['PLANNING', 'ACTIVE', 'COMPLETED'],
        require: true,
        default: 'PLANNING',
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH'],
        require: true,
        default: 'LOW',
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    assignee: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
})

export const TaskModel = mongoose.model<ITask>('Task', taskSchema)