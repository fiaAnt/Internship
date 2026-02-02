import mongoose from 'mongoose';

const FavoritesSchema = new mongoose.Schema(
    {
        auth0Id: { type: String, required: true },
        gameId: { type: String, required: true },
    },
    { timestamps: true }
);

FavoritesSchema.index({ auth0Id: 1, gameId: 1 }, { unique: true });

export default mongoose.model('Favorites', FavoritesSchema);
