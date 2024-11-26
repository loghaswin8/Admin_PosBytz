import axios from 'axios';

class LoginClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/login';
  }

  public async loginUser(userData: { email: string; password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/post`, userData, {
        headers: {
          'Content-Type': 'applicat ion/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Error logging in user');
    }
  }
}

export default LoginClient;
