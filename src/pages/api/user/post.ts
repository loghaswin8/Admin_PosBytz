import { NextApiRequest, NextApiResponse } from 'next';
import { registerHandlers } from '../../../server/server/register';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if (!body) {
    return res.status(400).json({ error: 'Request body is required for POST request' });
  }

  try {
    // Use the registerHandlers to handle user registration
    const result = await registerHandlers.post(body); 
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error in POST /api/user:', error);
    res.status(500).json({ error: 'Failed to create contact data' });
  }
}
