import axios from 'axios';

class IntroClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/home';
  }

  public async fetchIntro(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/get?id=${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching intro data from client:', error);
      throw error;
    }
  }

  public async updateIntro(introData: object): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/put`, introData);
      return response.data;
    } catch (error) {
      console.error('Error updating intro data from client:', error);
      throw error;
    }
  }

  public async createIntro(introData: object): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, introData);
      return response.data; 
    } catch (error) {
      console.error('Error creating intro data from client:', error);
      throw error;
    }
  }

  public async deleteIntro(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete?id=${id}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting intro data from client:', error);
      throw error;
    }
  }
}

export default new IntroClient();
