import React, { useState } from 'react';
import { useRouter } from 'next/router';
import FormInput from '../components/FormInput';
import LoginClient from '../server/client/login'; // Ensure correct import path
import { setCookie } from 'nookies';
import Cookies from 'js-cookie';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    const loginClient = new LoginClient();

    try {
      const result = await loginClient.loginUser(formData);
      Cookies.set('token', result.token, { expires: 1/86400});
      sessionStorage.setItem('token', result.token);
      const token = sessionStorage.getItem('token');  // Store token securely
      document.cookie = `token=${token}; path=/;`;

      router.push('/'); // Redirect to protected route
    } catch (err: any) {
      console.error('Login error:', err.message);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>  
  );
};

export default Login;
