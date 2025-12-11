import express from 'express'
import mongoose from 'mongoose'
import { ScooterModel, IScooter, IHATEOASLinks } from './models/Scooter'
import { DriverModel } from './models/Driver'


const createHATEOASLinks = (scooter: IScooter, baseUrl: string = ''): IHATEOASLinks => {
    const links: IHATEOASLinks = {
        self: { href: `${baseUrl}/scooters/${scooter.ssn}`, method: 'GET' }
    };
    if (scooter.currentRun?.driverId) {
        links.driver = {
            href: `${baseUrl}/drivers/${scooter.currentRun.driverId}`,
            method: 'GET'
        };
    }

    return links;
};

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect("mongodb://localhost:27017/scooters")
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err))

app.get('/scooters', async (req, res) => {
    try {
        const scooters = await ScooterModel.find();
        const scootersWithLinks = scooters.map(scooter => {
            const scooterObj = scooter.toObject();
            scooterObj.links = createHATEOASLinks(scooter);
            return scooterObj;
        });

        res.status(200).json({
            success: true,
            count: scooters.length,
            data: scootersWithLinks
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});

app.get('/scooters/:ssn', async (req, res) => {
    try {
        const scooter = await ScooterModel.findOne({ ssn: req.params.ssn });
        if (!scooter) {
            return res.status(404).json({
                success: false,
                error: 'not found'
            });
        }

        const scooterObj = scooter.toObject();
        scooterObj.links = createHATEOASLinks(scooter);

        res.status(200).json({
            success: true,
            data: scooterObj
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});

app.post('/scooters', async (req, res) => {
    try {
        if (!req.body.ssn) {
            return res.status(400).json({
                success: false,
                error: 'ssn error'
            });
        }
        const newScooter = new ScooterModel(req.body);
        await newScooter.save();
        const scooterObj = newScooter.toObject();
        res.status(201).json({
            success: true,
            message: 'scooter created',
            data: scooterObj
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(400).json({
            success: false,
            error: errorMessage
        });
    }
});

app.put('/scooters/:ssn', async (req, res) => {
    try {
        const updatedScooter = await ScooterModel.findOneAndUpdate(
            { ssn: req.params.ssn },
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedScooter) {
            return res.status(404).json({
                success: false,
                error: 'scooter not found'
            });
        }

        const scooterObj = updatedScooter.toObject();
        scooterObj.links = createHATEOASLinks(updatedScooter);

        res.status(200).json({
            success: true,
            message: 'scooter updated',
            data: scooterObj
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(400).json({
            success: false,
            error: errorMessage
        });
    }
});

app.delete('/scooters/:ssn', async (req, res) => {
    try {
        const result = await ScooterModel.deleteOne({ ssn: req.params.ssn });
        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                error: 'scooter not found'
            });
        }
        res.status(204).send();
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});
app.get('/scooters/status/in-use', async (req, res) => {
    try {
        const scooters = await ScooterModel.find({ status: 'In use' });
        const scootersWithLinks = scooters.map(scooter => {
            const scooterObj = scooter.toObject();
            scooterObj.links = createHATEOASLinks(scooter);
            return scooterObj;
        });

        res.status(200).json({
            success: true,
            count: scooters.length,
            data: scootersWithLinks
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});
app.get('/drivers/:id', async (req, res) => {
    try {
        const driver = await DriverModel.findOne({ id: req.params.id });
        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'driver not found'
            });
        }

        res.status(200).json({
            success: true,
            data: driver
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(500).json({
            success: false,
            error: errorMessage
        });
    }
});

app.post('/drivers', async (req, res) => {
    try {
        if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.email) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: id, firstName, lastName, email'
            });
        }

        const driver = new DriverModel(req.body);
        await driver.save();

        res.status(201).json({
            success: true,
            message: 'Driver created',
            data: driver
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown';
        res.status(400).json({
            success: false,
            error: errorMessage
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});