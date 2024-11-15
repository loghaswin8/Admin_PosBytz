import axios from 'axios';

class CareerClient {
  private baseUrl: string;

  constructor() {
    // Base URL for API requests
    this.baseUrl = '/api/career';
  }

  // Fetch career data from the server (GET)
  public async fetchCareer(id: string): Promise<any> {
    try {
      const response = await axios.get(`/api/career/get?id=${id}`, {
        headers: {
          'Content-Type': 'application/json', // Example: Adjust if needed
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching career data:', error);
      throw new Error('Error fetching career data');
    }
  }

  // Update career data on the server (PUT)
  public async updateCareer(careerData: object): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/put`, careerData);
      return response.data; // Return the updated data
    } catch (error) {
      console.error('Error updating career data from client:', error);
      throw error;
    }
  }

  // Create new career data on the server (POST)
  public async createCareer(careerData: object): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, careerData);
      return response.data; // Return the newly created data
    } catch (error) {
      console.error('Error creating career data from client:', error);
      throw error;
    }
  }

  // Delete career data from the server (DELETE)
  public async deleteCareer(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`);
      return response.data; // Return the result of the deletion
    } catch (error) {
      console.error('Error deleting career data from client:', error);
      throw error;
    }
  }
}

export default new CareerClient();
