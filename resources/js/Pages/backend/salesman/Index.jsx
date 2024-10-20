import { useForm } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { SalesmanModal } from "./components/Form";
import PageHeader2 from "../../../layout/components/PageHeader2";
import Alert from "../../../layout/components/AlertMessage";
import { motion } from "framer-motion";

export default function Index({ salesman }) {
    const [isOpen, setIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    // console.log(isOpen, postId);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    // console.log(message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { delete: destroy, processing } = useForm();
    const handleAddNewItem = () => {
        setCurrentItem(null); // Clear current item to open the modal for creating a new item
        setIsModalOpen(true);
    };

    const handleEditItem = (salesman) => {
        setCurrentItem(salesman); // Set the item to be edited
        setIsModalOpen(true);
    };
    const handleDelete = (id) => {
        setPostId(null);
        setIsOpen(false);
        destroy(`/salesmans/${id}`, {
            onSuccess: () => {
                setPostId(null);
                setIsOpen(false);
                setMessage({
                    visible: true,
                    description: "Salesman deleted successfully!",
                    type: "success",
                    title: "Success",
                });
            },
        });
    };
    const handleOpenModal = (id) => {
        setIsOpen(true);
        setPostId(id);
        setMessage({
            visible: false,
            description: "",
            type: "",
            title: "",
        });
    };
    const { get } = useForm();
    const handlePageChange = (url) => {
        get(url);
    };
    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader2
                title="Salesmans"
                setOpen={handleAddNewItem}
                setMessage={setMessage}
                name="Add Salesmans"
            />
            {salesman.data.length > 0 && (
                <>
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

                                        <td className="py-3 px-6 flex gap-2 justify-center">
                                            <button
                                                onClick={() => {
                                                    handleEditItem(salesman);
                                                    setMessage({
                                                        visible: false,
                                                        description: "",
                                                        type: "",
                                                        title: "",
                                                    });
                                                }}
                                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                            >
                                                <Pencil color="white" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleOpenModal(
                                                        salesman.user.id
                                                    )
                                                }
                                                className="bg-red-500 text-white rounded px-4 py-2"
                                            >
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

            <SalesmanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                salesman={currentItem}
                setMessage={setMessage}
            />

            {message.visible && (
                <Alert
                    type={message.type}
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}

            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-transform duration-300"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl text-black font-bold mb-4 text-center">
                            Are you sure?
                        </h2>
                        <p className="mb-6 text-gray-700 text-center">
                            Do you really want to delete this item? This action
                            cannot be undone.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={() => {
                                    handleDelete(postId);
                                }}
                                className={`px-6 py-3 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 transform hover:scale-105 ${
                                    processing ? "bg-gray-400" : "bg-red-600"
                                } text-white hover:bg-red-700`}
                                disabled={processing} // Disable button while processing
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-3"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                            />
                                        </svg>
                                        Deleting...
                                    </span>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setMessage({
                                        visible: false,
                                        description: "",
                                        type: "",
                                        title: "",
                                    });
                                    setIsOpen(false);
                                    setPostId(null);
                                }}
                                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </main>
    );
}
