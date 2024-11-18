import React, { useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { Link, useForm } from "@inertiajs/react";
import { formatDate } from "../../../helper/dateFormater";
import { Printer, ReceiptText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Alert from "../../../layout/components/AlertMessage";
import { SalesModal } from "./components/QuickSale";

export default function Index({ sales }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    const { delete: destroy, processing, get } = useForm();
    // console.log(sales);
    const handleDelete = (id) => {
        destroy(`/sales/${id}`, {
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
    const handlePageChange = (url) => {
        get(url);
    };
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <div className="flex-1 overflow-auto relative z-10 p-4">
                    {/* Header Section */}
                    <div className="mb-6 gap-3 flex flex-row items-center justify-between">
                        {/* Dynamic Title */}
                        <h3 className="text-xl font-semibold text-gray-100 w-25">
                            Sales
                        </h3>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                {"Quick Sales"}
                            </button>
                            <Link
                                href={"/sales/create"} // Adjust this path based on your routing
                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                                {"Add Sales"}
                            </Link>
                        </div>
                    </div>
                </div>

                {sales.data.length > 0 && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-center">
                                            Sl No.
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Customer
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Phone Number
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Total Payed
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Total Amount
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Sale Date
                                        </th>

                                        <th className="py-3 px-6 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {sales.data.map((sales, index) => (
                                        <tr
                                            key={sales.id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                {index + 1}.
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                {sales.customer
                                                    ? sales.customer.name
                                                    : "N/A"}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {sales.customer
                                                    ? sales.customer?.phone
                                                    : "N/A"}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {parseFloat(
                                                    parseInt(
                                                        sales.sales_payment
                                                            .cash_payment
                                                    ) +
                                                        parseInt(
                                                            sales.sales_payment
                                                                .online_payment ||
                                                                0
                                                        )
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {parseFloat(
                                                    sales.sales_payment.amount
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {formatDate(
                                                    new Date(sales.created_at)
                                                        .toISOString()
                                                        .split("T")[0]
                                                )}
                                            </td>

                                            <td className="py-3 px-6 flex gap-2 justify-center">
                                                <Link
                                                    href={`sales/${sales.id}`}
                                                    className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                                >
                                                    <ReceiptText color="white" />
                                                </Link>
                                                <Link
                                                    href={`sales/${sales.id}/invoice`}
                                                    className="bg-green-500 w-14 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                                >
                                                    <Printer color="white" />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        handleOpenModal(
                                                            sales.id
                                                        );
                                                    }}
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
                            {sales.links.map((link, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 mx-1 border ${
                                        link.active
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white text-indigo-500"
                                    } rounded hover:bg-indigo-600 hover:text-white`}
                                    onClick={() => handlePageChange(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {sales.data.length <= 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-center text-gray-600">
                            No users found.
                        </p>
                    </div>
                )}
            </main>

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

            <SalesModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setMessage={setMessage}
            />
        </>
    );
}
