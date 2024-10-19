import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import PageHeader2 from "../../../layout/components/PageHeader2";
import { Pencil, Trash2 } from "lucide-react";

const UserTable = ({ users, selectedRole }) => {
    const [role, setRole] = useState(selectedRole);
    console.log(role);
    const { get } = useForm();

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        // Make a request to the server with the selected role
        get("/users/" + selectedRole);
    };

    const handlePageChange = (url) => {
        get(url);
    };

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            {users.data.length > 0 && (
                <>
                    <div className="flex-1 overflow-auto relative z-10 p-4">
                        {/* Header Section */}
                        <div className="mb-6 gap-3 flex flex-row items-center justify-between">
                            {/* Dynamic Title */}
                            <h3 className="text-xl font-semibold text-gray-100 w-25">
                                Users
                            </h3>

                            <div className="flex justify-between items-center mb-4">
                                <select
                                    value={role}
                                    onChange={handleRoleChange}
                                    className="bg-gray-800 border border-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700"
                                >
                                    <option value="all">All Users</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                    <option value="salesman">Salesman</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">
                                        Sl No.
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Name
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Phone Number
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Role
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        WhatsApp Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {users.data.map((user, index) => (
                                    <tr
                                        key={user.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {index + 1}.
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {user.name}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {user.phone}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {user.role}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {user.wpnumber}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        {users.links.map((link, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-1 border ${
                                    link.active
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white text-indigo-500"
                                } rounded hover:bg-indigo-600 hover:text-white`}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </>
            )}

            {users.data.length <= 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-gray-600">No users found.</p>
                </div>
            )}
        </main>
    );
};

export default UserTable;
