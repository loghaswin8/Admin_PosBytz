import axios from "axios";

class EntityClient {

  public async createEntity(entityData: { name: string; slug: string }): Promise<any> {
    try {
      const response = await axios.post(`/api/entity/post`, entityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw new Error('Error creating entity');
    }
  }

  // Fetch all entities for the dropdown
  public async getAllEntities(): Promise<any> {
    try {
      const response = await axios.get(`/api/entity/get`);
      return response.data;
    } catch (error) {
      console.error('Error fetching entities:', error);
      throw new Error('Error fetching entities');
    }
  }

  // Fetch an entity by its ID
  public async getEntityById(entityId: string): Promise<any> {
    try {
      const response = await axios.get(`/api/entity/get/${entityId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching entity by ID:', error);
      throw new Error('Error fetching entity by ID');
    }
  }
}

export default new EntityClient();
