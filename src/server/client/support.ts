import axios from 'axios';
import Cookies from 'js-cookie';

class SupportClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/support';
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

  public async fetchSupport(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.get(`${this.baseUrl}/get?id=${id}`, {headers});
      console.log('Fetched support data:', response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching support data:', error);
      throw error;
    }
  }

  public async updateSupport(supportData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.put(`${this.baseUrl}/put`, supportData, { headers });
      console.log('Updated support data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating support data:', error);
      throw error;
    }
  }

  public async createSupport(supportData: object): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.post(`${this.baseUrl}/post`, supportData, { headers });
      console.log('Created support data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating support data:', error);
      throw error;
    }
  }

  public async deleteSupport(id: string): Promise<any> {
    try {
      const headers = this.getAuthHeaders();
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`, { headers });
      console.log('Deleted support data:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting support data:', error);
      throw error;
    }
  }
}

export default new SupportClient();
