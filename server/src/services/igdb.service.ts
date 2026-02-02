import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../.env'),
});

const headers = {
    'Client-ID': process.env.CLIENT_ID!,
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    'Content-Type': 'text/plain',
};

interface IGDBApiResponse {
    id: number;
    name: string;
    cover?: { url: string };
    rating?: number;
    first_release_date?: number;
    genres?: Array<{ id: number; name: string }>;
    platforms?: Array<{ id: number; name: string }>;
}

export const igdbFetch = async (endpoint: string, body: string): Promise<IGDBApiResponse[]> => {
    try {
        const response = await fetch(`${process.env.IGDB_URL}/${endpoint}`, {
            method: 'POST',
            headers,
            body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('IGDB Error:', errorText);
            throw new Error(`IGDB API error: ${response.status} ${errorText}`);
        }

        const data: IGDBApiResponse[] = await response.json() as IGDBApiResponse[];
        return data;
    } catch (error) {
        console.error('IGDB Fetch failed:', error);
        throw error;
    }
};