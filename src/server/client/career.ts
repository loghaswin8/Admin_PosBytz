import axios from 'axios';
import Cookies from 'js-cookie';

class CareerClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/career';
  }

  private getAuthHeaders() {
    const token = Cookies.get('token') || sessionStorage.getItem('token');
    console.log('Session Token:', token); 

    if (!token ) {
      throw new Error('Authentication data missing');
    }

    return {
      'Authorization': token,
    };
  }

  public async fetchCareer(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(`${this.baseUrl}/get?id=${id}`, { headers });
      console.log('Fetched career data:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching career data:', error);
      throw error;
    }
  }

  public async updateCareer(careerData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.baseUrl}/put`, careerData, { headers });
      console.log('Updated career data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating career data:', error);
      throw error;
    }
  }

  public async createCareer(careerData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.post(`${this.baseUrl}/post`, careerData, { headers });
      console.log('Created career data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating career data:', error);
      throw error;
    }
  }

  public async deleteCareer(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`, { headers });
      console.log('Deleted career data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting career data:', error);
      throw error;
    }
  }
}

export default new CareerClient();
