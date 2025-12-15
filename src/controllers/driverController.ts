import { Request, Response } from 'express'
import { DriverModel } from '../models/Driver'

export const getDriver = async (req: Request, res: Response) => {
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
};

export const createDriver = async (req: Request, res: Response) => {
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
};