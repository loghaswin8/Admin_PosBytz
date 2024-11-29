// pages/api/permission/get.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { permissionHandlers } from '../../../server/server/permission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const permissions = await permissionHandlers.getAllPermissions();
      res.status(200).json({ permissions });
    } catch (error) {
      console.error('Error in GET /api/permission:', error);
      res.status(500).json({ error: 'Failed to fetch permissions' });
    }
  } else {
    // Handle other methods (optional)
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
