import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class CareerServer {
  // Fetch career data from the server (GET)
  public async fetchCareer(): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/career`);
      return response.data;
    } catch (error) {
      console.error('Error fetching career data from server:', error);
      throw error;
    }
  }

  // Create career data on the server (POST)
  public async createCareer(careerData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/career`, careerData);
      return response.data;
    } catch (error) {
      console.error('Error creating career data:', error);
      throw error;
    }
  }

  // Update career data on the server (PUT)
  public async updateCareer(careerData: object): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/career`, careerData);
      return response.data;
    } catch (error) {
      console.error('Error updating career data:', error);
      throw error;
    }
  }

  // Delete career data from the server (DELETE)
  public async deleteCareer(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${NESTJS_BASE_URL}/career/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting career data:', error);
      throw error;
    }
  }
}

// Export the instance of CareerServer to use in handlers
export const careerServer = new CareerServer();

// Handlers Object for server-side requests
export const careerHandlers = {
  get: careerServer.fetchCareer.bind(careerServer),
  post: careerServer.createCareer.bind(careerServer),
  put: careerServer.updateCareer.bind(careerServer),
  delete: careerServer.deleteCareer.bind(careerServer),
};
