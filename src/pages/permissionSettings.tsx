import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '@/components/Modal';
import PermissionClient from '../server/client/permission';
import EntityClient from '../server/client/entity';
import { validateToken } from '@/auth/authHelper';
import { useRouter } from 'next/router';


const PermissionSettings = () => {
    const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);
    const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [entityData, setEntityData] = useState({ name: '', slug: '' });
    const [permissionData, setPermissionData] = useState({ name: '', entity: '', slug: '' });
    const [entities, setEntities] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const router = useRouter();

    useEffect(() => {
        fetchEntities();
        fetchPermissions();
    }, []);

    const fetchEntities = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/entity/get');
            const data = await response.json();
            setEntities(data.entities);
        } catch (error) {
            console.error('Failed to fetch entities:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPermissions = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/permission/get');
            const data = await response.json();
            setPermissions(data.permissions);
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEntityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEntityData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPermissionData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEntitySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdEntity = await EntityClient.createEntity(entityData);
            setEntities((prevEntities) => [...prevEntities, createdEntity]);
            setEntityData({ name: '', slug: '' });
            setIsEntityModalOpen(false);
            router.reload(); 
        } catch (error) {
            console.error('Failed to create entity:', error);
        }
    };

    const handlePermissionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdPermission = await PermissionClient.createPermission(permissionData);
            setPermissions((prevPermissions) => [...prevPermissions, createdPermission]);
            setPermissionData({ name: '', entity: '', slug: '' });
            setIsPermissionModalOpen(false);
            router.reload();
        } catch (error) {
            console.error('Failed to create permission:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPermissions = permissions.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <Layout>
            <div className="pl-[17%] p-8 bg-white">
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-6">Permission Settings</h1>

                    <div className="space-x-4 mb-8">
                        <button
                            onClick={() => setIsEntityModalOpen(true)}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                            Create Entity
                        </button>
                        <button
                            onClick={() => setIsPermissionModalOpen(true)}
                            className="bg-green-500 text-white py-2 px-4 rounded-lg"
                        >
                            Create Permission
                        </button>
                    </div>

                    {/* Permissions Table */}
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="w-full bg-gray-200">
                                <th className="py-2 px-4 border">S.No</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Entity</th>
                                <th className="py-2 px-4 border">Slug</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPermissions.length > 0 ? (
                                currentPermissions.map((permission, index) => (
                                    <tr key={permission._id} className="text-center">
                                        <td className="py-2 px-4 border">{indexOfFirstItem + index + 1}</td>
                                        <td className="py-2 px-4 border">{permission.name}</td>
                                        <td className="py-2 px-4 border">{entities.find(e => e._id === permission.entity)?.name}</td>
                                        <td className="py-2 px-4 border">{permission.slug}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-4 text-center text-gray-500">No permissions found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        {Array.from({ length: Math.ceil(permissions.length / itemsPerPage) }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Modals */}
                    {isEntityModalOpen && (
                        <Modal>
                            <h2 className="text-xl font-bold mb-4">Create New Entity</h2>
                            <form onSubmit={handleEntitySubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={entityData.name}
                                        onChange={handleEntityChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={entityData.slug}
                                        onChange={handleEntityChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setIsEntityModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
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

                    {isPermissionModalOpen && (
                        <Modal>
                            <h2 className="text-xl font-bold mb-4">Create New Permission</h2>
                            <form onSubmit={handlePermissionSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={permissionData.name}
                                        onChange={handlePermissionChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Entity</label>
                                    <select
                                        name="entity"
                                        value={permissionData.entity}
                                        onChange={handlePermissionChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="" disabled>Select an entity</option>
                                        {entities && entities.length > 0 ? (
                                            entities.map((entity) => (
                                                <option key={entity._id} value={entity._id}>
                                                    {entity.name}
                                                    {console.log('permission modal entity: ', entity.name)}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No entities available</option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={permissionData.slug}
                                        onChange={handlePermissionChange}
                                        className="mt-1 p-2 w-full border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setIsPermissionModalOpen(false)}
                                        className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white py-2 px-4 rounded-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default PermissionSettings;