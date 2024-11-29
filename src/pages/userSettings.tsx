import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Modal from '@/components/Modal';
import { validateToken } from '@/auth/authHelper';
import RegisterClient from '../server/client/register'; 

const UsersPerPage = 20; 

const UserSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [users, setUsers] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await RegisterClient.getAllUsers();
                setUsers(data); 
                setTotalPages(Math.ceil(data.length / UsersPerPage));  
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);  

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await RegisterClient.registerUser(userData);  
            setUserData({ name: '', email: '', password: '' });
            setIsModalOpen(false);
            router.reload();  
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const currentPageUsers = users.slice((currentPage - 1) * UsersPerPage, currentPage * UsersPerPage);

    return (
        <Layout>
            <div className="pl-[17%] p-8 bg-white">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6">User Settings</h1>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
                    >
                        Create User
                    </button>

                    {isModalOpen && (   
                        <Modal>
                            <h2 className="text-xl font-bold mb-4">Create New User</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleInputChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold mb-4">Registered Users</h2>
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr>
                                    <th className="border-b px-4 py-2 text-left">S.No</th>
                                    <th className="border-b px-4 py-2 text-left">Name</th>
                                    <th className="border-b px-4 py-2 text-left">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageUsers.map((user, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border-b px-4 py-2">{(currentPage - 1) * UsersPerPage + index + 1}</td>
                                        <td className="border-b px-4 py-2">{user.name}</td>
                                        <td className="border-b px-4 py-2">{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="mt-7 flex justify-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                            >
                                Prev
                            </button>
                            <span className="py-2 px-4">{currentPage} / {totalPages}</span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
    
export default UserSettings;

export const getServerSideProps = async (context) => {
    const { req } = context;
  
    const { valid, token, redirect } = validateToken(req);
  
    if (!valid) {
      console.log("Redirecting to login due to empty token...");
      return {
        redirect,
      };
    }
  
    return {
      props: {
        token,
      },
    };
};