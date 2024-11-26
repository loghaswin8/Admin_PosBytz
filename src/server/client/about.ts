import axios from 'axios';
import Cookies from 'js-cookie';

class AboutClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/about';
  }

  private getAuthHeaders() {
    const token = Cookies.get('token') || sessionStorage.getItem('token');
    console.log('Session Token:', token);  

    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  public async fetchAbout(id: string): Promise<any> {
    try {
      const token = Cookies.get('token') || sessionStorage.getItem('token');
      const response = await axios.get(`${this.baseUrl}/get?id=${id}`, {
        headers: {
          'Authorization': token,
        }
      });
      console.log('Fetched about data:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching about data:', error);
      throw error;
    }
  }

  public async updateAbout(aboutData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.baseUrl}/put`, aboutData, { headers });
      console.log('Updated about data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating about data:', error);
      throw error;
    }
  }

  public async createAbout(aboutData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.post(`${this.baseUrl}/post`, aboutData, { headers });
      console.log('Created about data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating about data:', error);
      throw error;
    }
  }

  public async deleteAbout(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`, { headers });
      console.log('Deleted about data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting about data:', error);
      throw error;
    }
  }
}

export default new AboutClient();
