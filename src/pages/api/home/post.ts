import { NextApiRequest, NextApiResponse } from 'next';
import { introHandlers } from '../../../server/server/home';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { body } = req;

    // Extract the Authorization header and user_id
    const authHeader = req.headers.authorization;
    const userId = req.headers['x-user-id']; // Extract user_id from custom header

    console.log('Authorization header:', authHeader);
    console.log('User ID header:', userId);

    // Extract the token from the Authorization header
    const token = authHeader?.split(' ')[1];
    console.log('Token in API handler:', token);

    // Validate the presence of token and user_id
    if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }

    if (!userId) {
        return res.status(400).json({ error: 'User ID is missing in the request headers' });
    }

    if (!body) {
        return res.status(400).json({ error: 'Request body is required for POST request' });
    }

    console.log("Received POST request with body:", body);

    try {
        // Pass both token and userId to the introHandlers.post method
        const result = await introHandlers.post(body, token as string, userId as string);
        console.log("Server Response:", result);
        
        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error in POST /api/home:', error);
        res.status(500).json({ error: 'Failed to create intro data' });
    }
}
