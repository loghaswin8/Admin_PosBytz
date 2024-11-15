import { NextApiRequest, NextApiResponse } from 'next';
import { aboutHandlers } from '../../../server/server/about'; // Adjust path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Check if the ID is provided for DELETE request
  if (!id) {
    return res.status(400).json({ error: 'ID is required for DELETE request' });
  }

  try {
    const result = await aboutHandlers.delete(id as string); // Handle DELETE logic
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in DELETE /api/about:', error);
    res.status(500).json({ error: 'Failed to delete about data' });
  }
}
