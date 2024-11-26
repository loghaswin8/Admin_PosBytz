import { NextApiRequest, NextApiResponse } from 'next';
import { registerHandlers } from '../../../server/server/register';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (req.method === 'GET') {
    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    try {
      // Use the registerHandlers to check if the email exists
      const emailExists = await registerHandlers.checkEmailExists(email as string);
      res.status(200).json({ emailExists });
    } catch (error) {
      console.error('Error in GET /api/register:', error);
      res.status(500).json({ error: 'Failed to check email existence' });
    }
  } else {
    // Handle other methods (optional)
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
