import axios from 'axios';

class RegisterClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/user'; 
  }

  public async registerUser(userData: { name: string; email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Error registering user');
    }
  }

  public async checkEmailExists(email: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/get`, {
        params: { email },
        headers: {  
          'Content-Type': 'application/json',
        },
      });
      return response.data; 
    } catch (error) {
      console.error('Error checking email:', error);
      throw new Error('Error checking email');
    }
  }

  public async getAllUsers(): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/all`);
      return response.data.users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Error fetching all users');
    }
  }
}

export default new RegisterClient();
