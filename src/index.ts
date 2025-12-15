import express from 'express'
import mongoose from 'mongoose'
import scooterRoutes from './routes/scooterRoutes'
import driverRoutes from './routes/driverRoutes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/scooters")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

app.use('/scooters', scooterRoutes)
app.use('/drivers', driverRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});