import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Modal from '@/components/Modal';
import RoleClient from '../server/client/roles'; // Import RoleClient to use for API calls

const RoleSettings = () => {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleData, setRoleData] = useState({ name: '', permissions: [] });
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<any[]>([]); // State to store roles
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rolesPerPage = 10;

  // Fetch permissions and roles when the component loads
  useEffect(() => {
    fetchPermissions();
    fetchRoles();
  }, []);

  // Fetch permissions from the backend
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

  // Fetch all roles from the backend using RoleClient
  const fetchRoles = async () => {
    try {
      const fetchedRoles = await RoleClient.getAllRoles();
      setRoles(fetchedRoles);
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  };

  // Handle changes in role input fields
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle permission checkbox changes
  const handlePermissionCheck = (permissionId: string) => {
    setRoleData((prev) => {
      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId];
      return { ...prev, permissions: newPermissions };
    });
  };

  // Handle form submission to create a new role
  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use RoleClient to create the role
      await RoleClient.createRole(roleData);
      setRoleData({ name: '', permissions: [] }); // Reset the role form
      setIsRoleModalOpen(false); // Close the modal
      fetchRoles(); // Refresh the list of roles
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  // Pagination Logic
  const indexOfLastRole = currentPage * rolesPerPage;
  const indexOfFirstRole = indexOfLastRole - rolesPerPage;
  const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="pl-[17%] p-8 bg-gray-100 min-h-screen">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Role Settings</h1>

          {/* Button to open the Create Role Modal */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg mb-8 transition duration-200"
          >
            Create Role
          </button>

          {/* Display the roles in a table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="w-full bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 text-left">S.No</th>
                  <th className="py-3 px-4 text-left">Role Name</th>
                  <th className="py-3 px-4 text-left">Permission Names</th>
                </tr>
              </thead>
              <tbody>
                {currentRoles.length > 0 ? (
                  currentRoles.map((role, index) => (
                    <tr key={role._id} className="border-b">
                      <td className="py-3 px-4">{indexOfFirstRole + index + 1}</td>
                      <td className="py-3 px-4">{role.name}</td>
                      <td className="py-3 px-4">
                        {role.permissions
                          .map((permId) => permissions.find((p) => p._id === permId)?.name || permId)
                          .join(', ')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-gray-500 py-4 text-center">
                      No roles available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: Math.ceil(roles.length / rolesPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-4 py-2 rounded-lg ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          {/* Create Role Modal */}
          {isRoleModalOpen && (
            <Modal onClose={() => setIsRoleModalOpen(false)}>
              <div className="relative">
                {/* Close Button */}
                <button
                  onClick={() => setIsRoleModalOpen(false)}
                  className="absolute top-2 right-2 text-gray-700 text-2xl font-light hover:text-gray-900"
                >
                  ✖
                </button>

                <form onSubmit={handleRoleSubmit} className="p-6 bg-white rounded-lg shadow-md w-full max-w-lg mx-auto">
                  <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create Role</h2>

                  {/* Role Name Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="roleName">
                      Role Name
                    </label>
                    <input
                      type="text"
                      id="roleName"
                      name="name"
                      value={roleData.name}
                      onChange={handleRoleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Permissions Checkboxes */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-4">
                      Select Permissions
                    </label>
                    {loading ? (
                      <p>Loading permissions...</p>
                    ) : permissions.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {permissions.map((permission) => (
                          <label key={permission._id} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              value={permission._id}
                              checked={roleData.permissions.includes(permission._id)}
                              onChange={() => handlePermissionCheck(permission._id)}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">{permission.name}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No permissions available.</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-200"
                  >
                    Create Role
                  </button>
                </form>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RoleSettings;

