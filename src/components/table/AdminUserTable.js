import React from 'react';
import { useGetAllUsersQuery } from '@/lib/redux/features/admin/adminApi';
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

const AdminUserTable = () => {
  const { data: users, error, isLoading } = useGetAllUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

    console.log( users);

  return (
      <div className="flex justify-center">
  <div className="shadow-xl p-4 rounded-lg bg-white w-full">
    <p className="text-xl font-semibold mb-4 text-center">Зареєстровані користувачі</p>
          <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
              Active
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
              Verification
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isActive ? 'Yes' : 'No'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center items-center" >
                {user.role} {user.role === "User" ? <FaUser /> : <RiAdminFill />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
          </div>
    </div>
  );
};

export default AdminUserTable;