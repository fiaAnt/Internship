import { Router } from 'express';
import User from '../models/User.ts';

const router = Router();

router.get('/user', async (req, res) => {
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
    res.json({
        isAuthenticated: true,
        user,
    });
});
router.get('/', (_req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/`);
});
export default router;
