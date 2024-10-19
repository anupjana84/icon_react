import { useForm } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function Index({ salesman }) {
    const { get } = useForm();
    const handlePageChange = (url) => {
        get(url);
    };
    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            {salesman.data.length > 0 && (
                <>
                    <div className="flex-1 overflow-auto relative z-10 p-4">
                        {/* Header Section */}
                        <div className="mb-6 gap-3 flex flex-row items-center justify-between">
                            {/* Dynamic Title */}
                            <h3 className="text-xl font-semibold text-gray-100 w-25">
                                Salesmans
                            </h3>
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
                                        Code
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Total Points
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        WhatsApp Number
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {salesman.data.map((salesman, index) => (
                                    <tr
                                        key={salesman.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {index + 1}.
                                        </td>
                                        <td className="py-3 px-6 text-center whitespace-nowrap">
                                            {salesman.user.name}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {salesman.user.phone}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {salesman.code}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {salesman.point +
                                                salesman.other_point}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full
                                        ${
                                            salesman.status === 1
                                                ? "bg-green-200 text-green-600"
                                                : "bg-red-200 text-red-600"
                                        }`}
                                            >
                                                {salesman.status === 1
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {salesman.user.wpnumber}
                                        </td>
                                        <td className="py-3 px-6 flex gap-2 justify-center">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                                                <Pencil color="white" />
                                            </button>
                                            <button className="bg-red-500 text-white rounded px-4 py-2">
                                                <Trash2 color="white" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center items-center mt-4">
                        {salesman.links.map((link, index) => (
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

            {salesman.data.length <= 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-gray-600">No users found.</p>
                </div>
            )}
        </main>
    );
}
