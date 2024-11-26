import { NextApiRequest, NextApiResponse } from 'next';
import { introHandlers } from '../../../server/server/home';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  const authHeader = req.headers.authorization;

  console.log('Authorization header:', authHeader);

  const token = authHeader;
  console.log('Token in API handler:', token);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for PUT request' });
  }

  console.log('Received PUT request with body:', body);

  try {
    const result = await introHandlers.put(body, token as string);
    console.log('Server Response:', result);
    
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in PUT /api/home:', error);
    res.status(500).json({ error: 'Failed to update intro data' });
  }
}
