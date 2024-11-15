import { NextApiRequest, NextApiResponse } from 'next';
import { contactHandlers } from '../../../server/server/contact'; // Adjust path accordingly

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for PUT request' });
  }

  try {
    const result = await contactHandlers.put(body); // Handle PUT logic
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in PUT /api/contact:', error);
    res.status(500).json({ error: 'Failed to update contact data' });
  }
}
