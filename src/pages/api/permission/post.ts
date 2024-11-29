import { NextApiRequest, NextApiResponse } from 'next';
import { permissionHandlers } from '../../../server/server/permission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;

    if (!body || !body.name || !body.entity || !body.slug) {
      return res.status(400).json({ error: 'Invalid request body. Required: name, entity, slug' });
    }

    try {
      const newPermission = await permissionHandlers.createPermission(body);
      res.status(201).json({ data: newPermission });
    } catch (error) {
      console.error('Error in POST /api/permission:', error);
      res.status(500).json({ error: 'Failed to create permission' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
