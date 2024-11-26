import type { NextApiRequest, NextApiResponse } from 'next';
import LoginServer from '../../../server/server/login';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const loginData = req.body;
      const result = await LoginServer.loginUser(loginData);
      console.log('Request data:', req.body);
      console.log('API handler result:', result);
      
      res.status(200).json(result); 
    } catch (error: any) {
      console.error('Error in API login handler:', error.message);
      res.status(400).json({ message: error.message || 'Error logging in user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
