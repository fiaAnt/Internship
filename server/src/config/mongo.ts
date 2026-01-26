import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/gamesCatalog');
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
