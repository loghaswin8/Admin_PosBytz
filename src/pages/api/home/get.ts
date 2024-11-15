import { NextApiRequest, NextApiResponse } from 'next';
import { introHandlers } from '../../../server/server/home'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if the ID is provided for GET request
  if (!id) {
    return res.status(400).json({ error: 'ID is required for GET request' });
  }

  try {
    const result = await introHandlers.get(id as string); // Handle GET logic
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/home:', error);
    res.status(500).json({ error: 'Failed to fetch intro data' });
  }
}
