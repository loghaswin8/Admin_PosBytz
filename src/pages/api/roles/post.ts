import { NextApiRequest, NextApiResponse } from 'next';
import { roleHandlers } from '../../../server/server/roles';

const createRole = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, permissions } = req.body;

  if (!name || !permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const newRole = await roleHandlers.createRole({ name, permissions });
    res.status(201).json({ role: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ message: 'Error creating role' });
  }
};

export default createRole;
