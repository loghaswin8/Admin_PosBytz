import { NextApiRequest, NextApiResponse } from 'next';
import { contactHandlers } from '../../../server/server/contact'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const authHeader = req.headers.authorization;

  console.log('Authorization header:', authHeader);

  const token = authHeader; 
  console.log('Token in API handler:', token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID is required and must be a string' });
  }

  console.log(`Received request with ID: ${id}`);

  try {
    const result = await contactHandlers.get(token as string); // Ensure the handler expects token and userId
    console.log('Server Response:', result);

    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
}
