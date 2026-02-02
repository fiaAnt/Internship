import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        auth0Id: { type: String, required: true },
        gameId: { type: String, required: true },
        text: { type: String, required: true },
        userName: { type: String },
        userAvatar: { type: String },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
