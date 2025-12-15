import { Request, Response } from 'express'
import { ScooterModel } from '../models/Scooter'
import createHATEOASLinks from '../utils'

export const getScooters = async (req: Request, res: Response) => {
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
};

export const getScooterBySsn = async (req: Request, res: Response) => {
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
};

export const createScooter = async (req: Request, res: Response) => {
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
};

export const updateScooter = async (req: Request, res: Response) => {
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
};

export const deleteScooter = async (req: Request, res: Response) => {
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
};

export const getScootersInUse = async (req: Request, res: Response) => {
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
};