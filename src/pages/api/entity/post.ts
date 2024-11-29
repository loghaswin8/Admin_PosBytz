// pages/api/permission/entity/post.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { entityHandlers } from '../../../server/server/entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body } = req;

    if (!body || !body.name || !body.slug) {
      return res.status(400).json({ error: 'Invalid request body. Required: name, slug' });
    } 

    try {
      const newEntity = await entityHandlers.createEntity(body);
      res.status(201).json({ data: newEntity });
    } catch (error) {
      console.error('Error in POST /api/permission/entity:', error);
      res.status(500).json({ error: 'Failed to create entity' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

