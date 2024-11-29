// pages/api/entity/get.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { entityHandlers } from '../../../server/server/entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (req.query.id) {
      // Fetch a single entity by ID if the 'id' is present in the query
      try {
        const entity = await entityHandlers.getEntityById(req.query.id as string);
        res.status(200).json({ entity });
      } catch (error) {
        console.error('Error in GET /api/entity/get/:id:', error);
        res.status(500).json({ error: 'Failed to fetch entity by ID' });
      }
    } else {
      // Fetch all entities if no ID is specified
      try {
        const entities = await entityHandlers.getAllEntities();
        res.status(200).json({ entities });
      } catch (error) {
        console.error('Error in GET /api/entity/get:', error);
        res.status(500).json({ error: 'Failed to fetch entities' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
