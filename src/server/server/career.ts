import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;

class CareerServer {
  public async fetchCareer(token: string): Promise<any> {
    try {
      const response = await axios.get(`${NESTJS_BASE_URL}/career`, {
        headers: {
          Authorization: token,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching career data from server:', error);
      throw error;
    }
  }

  public async createCareer(careerData: object): Promise<any> {
    try {
      const response = await axios.post(`${NESTJS_BASE_URL}/career`, careerData);
      return response.data;
    } catch (error) {
      console.error('Error creating career data:', error);
      throw error;
    }
  }

  public async updateCareer(careerData: object, token: string): Promise<any> {
    try {
      const response = await axios.put(`${NESTJS_BASE_URL}/career`, careerData, {
        headers: {
          Authorization: token,
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating career data:', error);
      throw error;
    }
  }

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

export const careerServer = new CareerServer();

export const careerHandlers = {
  get: careerServer.fetchCareer.bind(careerServer),
  post: careerServer.createCareer.bind(careerServer),
  put: careerServer.updateCareer.bind(careerServer),
  delete: careerServer.deleteCareer.bind(careerServer),
};
