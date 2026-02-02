import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import corsConfig from '../config/cors.ts';
import { auth } from 'express-openid-connect';
import { connectToMongoDB } from '../config/mongo.ts';
import { getAuthConfig } from '../config/auth0.ts';
import gameRouter from '../routes/game.routes.ts';
import translateRouter from '../routes/translate.routes.ts';
import commentRouter from '../routes/comment.routes.ts';
import routes from '../routes/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

const app = express();

async function startServer() {
    await connectToMongoDB();

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use('/api', auth(getAuthConfig()));
    app.use('/api', routes);
    app.get('/', (_req, res) => {
        res.redirect(`${process.env.CLIENT_URL}/`);
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
