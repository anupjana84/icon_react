// resources/js/Pages/ProductTable.jsx
import React, { useState } from "react";
import Header from "../../../layout/header";
import { Link, useForm, router } from "@inertiajs/react";
import { Menu, Trash2, Pencil, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../../layout/components/pageHeader";
import Alert from "../../../layout/components/AlertMessage";
import BarcodeComponent from "../../../layout/components/Barcode";
import BarcodeScanner from "../../../layout/components/BarcodeScanner";
// import PageHeader from "../../../layout/components/pageHeader";
const ProductTable = ({ product }) => {
    // console.log(product);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postId, setPostId] = useState(null);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    const {
        delete: destroy,
        processing,
        recentlySuccessful,
        errors,
    } = useForm({});

    const openModal = (id) => {
        setIsModalOpen(true);
        setPostId(id);
    };
    // console.log(product);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = (id) => {
        destroy(`/products/${id}`);
        router.on("success", () => {
            setPostId(null);
            closeModal();
            setMessage({
                visible: true,
                description: "Product deleted successfully!",
                type: "success",
                title: "Success",
            });
        });
        router.on("error", () => {
            setPostId(null);
            closeModal();
            setMessage({
                visible: true,
                description: "Failed to delete product!",
                type: "error",
                title: "Error",
            });
        });
    };

    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Product"
                    link="/products/create"
                    linkName="Add Product"
                />

                <div className="overflow-x-auto">
                    {product.data && product.data.length > 0 && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        Image
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Code
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Quantity
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Sale Price
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {product.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-left">
                                            <img
                                                src={
                                                    product.thumbnail_image ||
                                                    "/thumbnail.png"
                                                }
                                                alt={product.name}
                                                className="h-16 w-16 object-cover"
                                            />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <BarcodeComponent
                                                code={product.code}
                                                product={product}
                                            />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.quantity}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            ₹
                                            {Number(product.sale_price).toFixed(
                                                2
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center ">
                                            <span
                                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full
                                        ${
                                            product.status === "active"
                                                ? "bg-green-200 text-green-600"
                                                : "bg-red-200 text-red-600"
                                        }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6 flex justify-center items-center gap-2 mt-4">
                                            <Link
                                                href={`/products/${product.id}`}
                                                className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                            >
                                                <ReceiptText color="white" />
                                            </Link>

                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="bg-green-500 text-white rounded px-4 py-2 mr-2"
                                            >
                                                <Pencil color="white" />
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    openModal(product.id)
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
                    {product.data.length <= 0 && (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-center text-gray-600">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {product.links && product.data && product.data.length > 0 && (
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex space-x-2">
                            {product.links.map((link, index) => (
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

            {isModalOpen && (
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
                                onClick={closeModal}
                                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transform hover:scale-105"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}

            {/* <BarcodeScanner /> */}
        </>
    );
};

export default ProductTable;
