import { NextApiRequest, NextApiResponse } from 'next';
import { aboutHandlers } from '../../../server/server/about';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for POST request' });
  }

  try {
    const result = await aboutHandlers.post(body);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in POST /api/about:', error);
    res.status(500).json({ error: 'Failed to create about data' });
  }
}
