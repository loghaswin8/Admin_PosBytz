import React, { useState } from 'react';
import FormInput from '../components/FormInput';
import Link from 'next/link';
import RegisterClient from '../server/client/register';  // Importing RegisterClient

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [emailError, setEmailError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setEmailError('');
    setIsSubmitting(true);
  
    try {
      // Check if email already exists
      const emailExistsResponse = await RegisterClient.checkEmailExists(formData.email);
      const emailExists = emailExistsResponse?.emailExists;  // Access emailExists from response
  
      // if (emailExists) {
      //   setEmailError('This email is already registered.');
      //   setIsSubmitting(false);
      //   return;
      // }
  
      // Proceed with user registration
      const response = await RegisterClient.registerUser(formData);
      console.log('User registered successfully:', response);
      // Handle success (redirect, show success message, etc.)
    } catch (error) {
      console.error('Registration error:', error);
      setRegisterError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <FormInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
