import React, { useState } from "react";
import PageHeader2 from "../../../layout/components/PageHeader2";
import { Link, useForm } from "@inertiajs/react";
import Alert from "../../../layout/components/AlertMessage";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { CustomerModal } from "./Form";

export default function Index({ customers }) {
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

    const handleEditItem = (customer) => {
        setCurrentItem(customer); // Set the item to be edited
        setIsModalOpen(true);
    };
    const handleDelete = (id) => {
        setPostId(null);
        setIsOpen(false);
        destroy(`/customers/${id}`, {
            onSuccess: () => {
                setPostId(null);
                setIsOpen(false);
                setMessage({
                    visible: true,
                    description: "Sustomer deleted successfully!",
                    type: "success",
                    title: "Success",
                });
            },
            onError: () => {
                setMessage({
                    visible: true,
                    description: "Failed to delete Customer!",
                    type: "error",
                    title: "Error",
                });
            },
        });
        // router.on("success", () => {
        //     setMessage({
        //         visible: true,
        //         description: "Item deleted successfully!",
        //         type: "success",
        //         title: "Success",
        //     });
        // });
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
    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader2
                title="Customers"
                setOpen={handleAddNewItem}
                setMessage={setMessage}
                name="Add Customer"
            />
            {customers.data && customers.data.length > 0 && (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Sl No.</th>
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Address</th>

                            <th className="py-3 px-6 text-center">
                                Phone Number
                            </th>
                            <th className="py-3 px-6 text-center">
                                WhatsApp Number
                            </th>
                            <th className="py-3 px-6 text-center">Pin</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {customers.data.map((customer, index) => (
                            <tr key={customer.id}>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {customer.name}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {customer.address}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {customer.phone}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {customer.wpnumber || "N/A"}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {customer.pin}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    {(() => {
                                        if (customer.sales_ids) {
                                            try {
                                                // Parse the JSON, handling potential double encoding
                                                let parsedValue = JSON.parse(
                                                    customer.sales_ids
                                                );
                                                if (
                                                    typeof parsedValue ===
                                                    "string"
                                                ) {
                                                    parsedValue =
                                                        JSON.parse(parsedValue);
                                                }
                                                const length = Array.isArray(
                                                    parsedValue
                                                )
                                                    ? parsedValue.length
                                                    : 0;

                                                // Determine the styles based on the length
                                                let bgColor = "";
                                                let textColor = "";
                                                let label = "";

                                                if (length <= 1) {
                                                    bgColor = "bg-green-200";
                                                    textColor =
                                                        "text-green-600";
                                                    label = "New";
                                                } else if (length <= 5) {
                                                    bgColor = "bg-blue-200";
                                                    textColor = "text-blue-600";
                                                    label = "Few";
                                                } else if (length <= 10) {
                                                    bgColor = "bg-orange-200";
                                                    textColor =
                                                        "text-orange-600";
                                                    label = "Regular";
                                                } else {
                                                    bgColor = "bg-red-200";
                                                    textColor = "text-red-600";
                                                    label = "Many";
                                                }

                                                // Render the span with dynamic styles
                                                return (
                                                    <span
                                                        className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${bgColor} ${textColor}`}
                                                    >
                                                        {label}
                                                    </span>
                                                );
                                            } catch (error) {
                                                console.error(
                                                    "Invalid JSON in sales_ids:",
                                                    error
                                                );
                                                return (
                                                    <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-600">
                                                        Invalid
                                                    </span>
                                                );
                                            }
                                        } else {
                                            return (
                                                <span className="inline-block px-2 py-1 text-xs font-bold rounded-full bg-gray-200 text-gray-600">
                                                    No Data
                                                </span>
                                            );
                                        }
                                    })()}
                                </td>
                                <td className="py-3 px-6 flex gap-2 justify-center">
                                    <button
                                        onClick={() => {
                                            handleEditItem(customer);
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
                                            handleOpenModal(customer.id)
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
            )}
            {customers.data.length <= 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-gray-600">
                        No products found.
                    </p>
                </div>
            )}

            {customers.links && customers.data && customers.data.length > 0 && (
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex space-x-2">
                            {customers.links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.url}
                                        className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out transform ${
                                            link.active
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}

            <CustomerModal
                isOpen={isModalOpen}
                customer={currentItem}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentItem(null);
                }}
                setMessage={setMessage}
            />

            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
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
