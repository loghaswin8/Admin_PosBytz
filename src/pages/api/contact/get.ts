import { NextApiRequest, NextApiResponse } from 'next';
import { contactHandlers } from '../../../server/server/contact'; // Adjust path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if the ID is provided in the query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'ID is required and must be a string' });
  }

  try {
    console.log(`Fetching Contact data for ID: ${id}`);
    const result = await contactHandlers.get(id);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in GET /api/contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact data' });
  }
}
