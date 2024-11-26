import { NextApiRequest, NextApiResponse } from 'next';
import { introHandlers } from '../../../server/server/home'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    const authHeader = req.headers.authorization;
    // const userId = req.headers['x-user-id'];

    console.log('Authorization header:', authHeader);
    // console.log('User ID header:', userId);

    const token = authHeader;
    console.log('Token in API handler:', token);

    if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    // if (!userId) {
    //     return res.status(400).json({ error: 'User ID is missing in the request headers' });
    // }

    if (!id) {
        return res.status(400).json({ error: 'ID is required for GET request' });
    }

    console.log("Received request with id:", id);

    try {
        const result = await introHandlers.get(token as string);
        console.log("Server Response:", result);
        
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error in GET /api/home:', error);
        res.status(500).json({ error: 'Failed to fetch intro data' });
    }
}
