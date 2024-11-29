// server/entity.ts
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class EntityServer {
  // Create an entity
  public async createEntity(entityData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/entityPermission/entity`, entityData);
      return response.data;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw error;
    }
  }

  // Fetch all entities
  public async getAllEntities(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/entityPermission/entities`);
      return response.data;
    } catch (error) {
      console.error('Error fetching entities:', error);
      throw error;
    }
  }

  // Fetch a single entity by ID
  public async getEntityById(entityId: string): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/entityPermission/entity/${entityId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching entity by ID:', error);
      throw error;
    }
  }
}

export const entityServer = new EntityServer();

// Export handlers to use in API routes
export const entityHandlers = {
  createEntity: entityServer.createEntity.bind(entityServer),
  getAllEntities: entityServer.getAllEntities.bind(entityServer),
  getEntityById: entityServer.getEntityById.bind(entityServer),
};
