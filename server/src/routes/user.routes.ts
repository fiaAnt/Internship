import { Router } from 'express';
import User from '../models/User.ts';
import { z, ZodError } from 'zod';

const router = Router();

const userQuerySchema = z.object({
    includeDetails: z.string().optional(),
});

router.get('/user', async (req, res) => {
    try {
        const query = userQuerySchema.parse(req.query);
        const includeDetails = query.includeDetails === 'true';

        if (!req.oidc.isAuthenticated() || !req.oidc.user) {
            return res.json({ isAuthenticated: false, user: null });
        }

        const authUser = req.oidc.user;
        const auth0Id = authUser.sub;

        let user = await User.findOne({ auth0Id });

        if (!user) {
            user = await User.create({
                auth0Id,
                email: authUser.email,
                name: authUser.name,
                picture: authUser.picture,
            });
        }
        const responseUser = {
            name: user.name,
            email: user.email,
            picture: user.picture,
            sub: user.auth0Id,
        };

        res.json({
            isAuthenticated: true,
            user: responseUser,
        });
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return res
                .status(400)
                .json({ error: 'Invalid query params', details: err.issues });
        }
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/', (_req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/`);
});

export default router;
