import axios, { AxiosError } from 'axios';

import dotenv from 'dotenv';

dotenv.config();

// Get the base URL from environment variables
const NESTJS_BASE_URL = process.env.NESTJS_BASE_URL;    

class LoginServer {

    // Forward login request to the backend
    public async loginUser(userData: { email: string; password: string }): Promise<any> {
        try {
            const response = await axios.post(`${NESTJS_BASE_URL}/login`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Forwarding login request to backend:', userData);
            console.log('Backend response:', response.data);

            return response.data; 
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log('Error in server login:', error);
                throw new Error(error.response?.data?.message || 'Error in server login');
            } else {
                console.log('Unexpected error:', error);
                throw new Error('Unexpected error in server login');
            }
        }
    }
}

export default new LoginServer();
