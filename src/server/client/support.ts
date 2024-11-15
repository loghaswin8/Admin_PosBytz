import axios from 'axios';

class SupportClient {
  private baseUrl: string;

  constructor() {
    // Base URL for API requests
    this.baseUrl = '/api/support';
  }

  // Fetch support data from the server (GET)
  public async fetchSupport(id: string): Promise<any> {
    try {
      const response = await axios.get(`/api/support/get?id=${id}`, {
        headers: {
          'Content-Type': 'application/json', // Example: Adjust if needed
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching support data:', error);
      throw new Error('Error fetching support data');
    }
  }

  // Update support data on the server (PUT)
  public async updateSupport(supportData: object): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/put`, supportData);
      return response.data; // Return the updated data
    } catch (error) {
      console.error('Error updating support data from client:', error);
      throw error;
    }
  }

  // Create new support data on the server (POST)
  public async createSupport(supportData: object): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, supportData);
      return response.data; // Return the newly created data
    } catch (error) {
      console.error('Error creating support data from client:', error);
      throw error;
    }
  }

  // Delete support data from the server (DELETE)
  public async deleteSupport(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`);
      return response.data; // Return the result of the deletion
    } catch (error) {
      console.error('Error deleting support data from client:', error);
      throw error;
    }
  }
}

export default new SupportClient();
