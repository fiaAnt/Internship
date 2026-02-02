import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        auth0Id: { type: String, required: true, unique: true, ref: 'User' },
        email: { type: String, required: true },
        name: { type: String },
        picture: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model('User', UserSchema);
