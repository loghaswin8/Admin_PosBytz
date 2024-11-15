import { NextApiRequest, NextApiResponse } from 'next';
import { supportHandlers } from '../../../server/server/support'; // Adjust path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for POST request' });
  }

  try {
    const result = await supportHandlers.post(body); // Handle POST logic
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in POST /api/support:', error);
    res.status(500).json({ error: 'Failed to create support data' });
  }
}
