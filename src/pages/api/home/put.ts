import { NextApiRequest, NextApiResponse } from 'next';
import { introHandlers } from '../../../server/server/home';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for PUT request' });
  }

  try {
    const result = await introHandlers.put(body); // Handle PUT logic
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in PUT /api/home:', error);
    res.status(500).send({ error: 'Failed to update intro data' });
  }
}
