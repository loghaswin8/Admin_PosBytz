  // pages/api/register/all.ts
  import { NextApiRequest, NextApiResponse } from 'next';
  import { registerHandlers } from '../../../server/server/register';

  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      try {
        // Use the registerHandlers to fetch all users
        const allUsers = await registerHandlers.getAllUsers();
        res.status(200).json({ users: allUsers });
      } catch (error) {
        console.error('Error in GET /api/user/all:', error);
        res.status(500).json({ error: 'Failed to fetch all users' });
      }
    } else {
      // Handle other methods (optional)
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
