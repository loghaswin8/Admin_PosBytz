import { NextApiRequest, NextApiResponse } from 'next';
import { roleHandlers } from '../../../server/server/roles';

const getRoles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const roles = await roleHandlers.getAllRoles();
    res.status(200).json({ roles });
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ message: 'Error fetching roles' });
  }
};

export default getRoles;
