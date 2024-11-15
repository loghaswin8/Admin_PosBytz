import { NextApiRequest, NextApiResponse } from 'next';
import { aboutHandlers } from '../../../server/server/about';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if the ID is provided in the query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID is required and must be a string' });
  }

  try {
    console.log(`Fetching About data for ID: ${id}`);
    const result = await aboutHandlers.get(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/about:', error);
    res.status(500).json({ error: 'Failed to fetch about data' });
  }
}
