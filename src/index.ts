import express from 'express'
import mongoose from 'mongoose'
import { ScooterModel } from './models/Scooter'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    console.log('Body:', req.body)
    next()
})

mongoose.connect("mongodb://localhost:27017/scooters")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

app.post('/api', async (req, res) => {
    if (!req.body || typeof req.body !== 'object') {
        return res.status(400).json({
            success: false,
            error: 'Request body must be JSON object'
        })
    }

    const { operation, data } = req.body

    if (!operation) {
        return res.status(400).json({
            success: false,
            error: 'Operation is required and must be a string'
        })
    }

    try {
        console.log(`Operation: ${operation}`, data)

        switch (operation) {
            case 'getAllScooters':
                const allScooters = await ScooterModel.find()
                return res.json({
                    success: true,
                    count: allScooters.length,
                    data: allScooters
                })

            case 'getScooterBySSN':
                if (!data?.ssn) {
                    return res.json({
                        success: false,
                        error: 'SSN is required'
                    })
                }

                const found = await ScooterModel.findOne({ ssn: data.ssn })
                if (!found) {
                    return res.json({
                        success: false,
                        error: 'Scooter not found'
                    })
                }
                return res.json({ success: true, data: found })

            case 'createScooter':
                if (!data?.ssn) {
                    return res.json({
                        success: false,
                        error: 'SSN is required for creation'
                    })
                }

                try {
                    const created = await ScooterModel.create(data)
                    return res.json({
                        success: true,
                        message: 'Scooter created',
                        data: created
                    })
                } catch (err: any) {
                    return res.json({
                        success: false,
                        error: err.message
                    })
                }

            case 'updateScooter':
                if (!data?.ssn) {
                    return res.json({
                        success: false,
                        error: 'SSN is required for update'
                    })
                }

                const { ssn, ...updates } = data
                const updatedScooter = await ScooterModel.findOneAndUpdate(
                    { ssn },
                    { $set: updates },
                    { new: true, runValidators: true }
                )

                if (!updatedScooter) {
                    return res.json({
                        success: false,
                        error: 'Scooter not found'
                    })
                }

                return res.json({
                    success: true,
                    message: 'Scooter updated',
                    data: updatedScooter
                })

            case 'deleteScooter':
                if (!data?.ssn) {
                    return res.json({
                        success: false,
                        error: 'SSN is required for deletion'
                    })
                }

                const result = await ScooterModel.deleteOne({ ssn: data.ssn })

                if (!result.deletedCount) {
                    return res.json({
                        success: false,
                        error: 'Scooter not found'
                    })
                }

                return res.json({
                    success: true,
                    message: 'Scooter deleted'
                })

            case 'getFreeScooters':
                const freeScooters = await ScooterModel.find({ status: 'Free' })
                return res.json({
                    success: true,
                    count: freeScooters.length,
                    data: freeScooters
                })

            case 'getScootersByStatus':
                if (!data?.status) {
                    return res.json({
                        success: false,
                        error: 'Status is required'
                    })
                }
                const statusScooters = await ScooterModel.find({
                    status: data.status
                })
                return res.json({
                    success: true,
                    count: statusScooters.length,
                    data: statusScooters
                })

            default:
                return res.json({
                    success: false,
                    error: `Unknown operation: ${operation}`
                })
        }
    } catch (err: any) {
        console.error('Error:', err.message)
        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            details: err.message
        })
    }
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`📡 Server running on http://localhost:${PORT}`)
})