import express from 'express'
import mongoose from 'mongoose'
import { ScooterModel } from './models/Scooter'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/scooters")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

app.get('/scooters', async (req, res) => {
    try {
        const scooters = await ScooterModel.find()
        res.status(200).json({
            success: true,
            count: scooters.length,
            data: scooters
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(500).json({
            success: false,
            error: errorMessage
        })
    }
})

app.get('/scooters/:ssn', async (req, res) => {
    try {
        const scooter = await ScooterModel.findOne({ ssn: req.params.ssn })
        if (!scooter) {
            return res.status(404).json({
                success: false,
                error: 'not found'
            })
        }
        res.status(200).json({
            success: true,
            data: scooter
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(500).json({
            success: false,
            error: errorMessage
        })
    }
})

app.post('/scooters', async (req, res) => {
    try {
        if (!req.body.ssn) {
            return res.status(400).json({
                success: false,
                error: 'ssn error'
            })
        }
        const newScooter = await ScooterModel.create(req.body)
        res.status(201).json({
            success: true,
            message: 'scooter created',
            data: newScooter
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(400).json({
            success: false,
            error: errorMessage
        })
    }
})

app.put('/scooters/:ssn', async (req, res) => {
    try {
        const uptatedScooter = await ScooterModel.findOneAndUpdate(
            { ssn: req.params.ssn },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if (!uptatedScooter) {
            return res.status(404).json({
                success: false,
                error: 'scooter not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'scooter updated',
            data: uptatedScooter
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(400).json({
            success: false,
            error: errorMessage
        })
    }
})

app.delete('/scooters/:snn', async (req, res) => {
    try {
        const result = await ScooterModel.deleteOne({ ssn: req.params.snn })
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'scooter not found'
            })
        }
        res.status(204).send()
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(500).json({
            success: false,
            error: errorMessage
        })
    }
})

app.get('/scooters/status/:status', async (req, res) => {
    try {
        const scooters = await ScooterModel.find({
            status: req.params.status
        })
        res.status(200).json({
            success: true,
            count: scooters.length,
            data: scooters
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(500).json({
            success: false,
            error: errorMessage
        })
    }
})

app.get('/scooters/free', async (req, res) => {
    try {
        const scooters = await ScooterModel.find({ status: 'Free' })
        res.status(200).json({
            success: true,
            count: scooters.length,
            data: scooters
        })
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown'
        res.status(500).json({
            success: false,
            error: errorMessage
        })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})