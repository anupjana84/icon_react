// resources/js/Pages/ProductTable.jsx
import React, { useState } from "react";
import Header from "../../../layout/header";
import { Link } from "@inertiajs/react";
import { Menu, Trash2, Pencil, ReceiptText } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../../layout/components/pageHeader";
// import PageHeader from "../../../layout/components/pageHeader";
const ProductTable = ({ products, product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (item) => {
        setIsModalOpen(true);
    };
    console.log(product);
    const closeModal = () => setIsModalOpen(false);
    // const handleEdit = (id) => {
    //     // Redirect to the edit page for the product with the given id
    //     Inertia.get(`/products/edit/${id}`);
    // };

    // const handleDelete = (id) => {
    //     if (confirm("Are you sure you want to delete this product?")) {
    //         Inertia.delete(`/products/${id}`);
    //     }
    // };

    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Product"
                    link="/products/create"
                    linkName="Add Product"
                />

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Image</th>
                                <th className="py-3 px-6 text-left">
                                    Quantity
                                </th>
                                <th className="py-3 px-6 text-left">
                                    Sale Price
                                </th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {product.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-gray-200 hover:bg-gray-100"
                                >
                                    <td className="py-3 px-6 text-left">
                                        <img
                                            src={product.thumbnail_image}
                                            alt={product.name}
                                            className="h-16 w-16 object-cover"
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        {product.quantity}
                                    </td>
                                    <td className="py-3 px-6 text-left">
                                        ${product.sale_price}
                                    </td>
                                    <td className="py-3 px-6 text-left">
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
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            onClick={() =>
                                                handleEdit(product.id)
                                            }
                                            className="bg-blue-400 text-white rounded px-4 py-1 mr-2"
                                        >
                                            <ReceiptText color="white" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleEdit(product.id)
                                            }
                                            className="bg-green-500 text-white rounded px-4 py-1 mr-2"
                                        >
                                            <Pencil color="white" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                openModal(product.id)
                                            }
                                            className="bg-red-500 text-white rounded px-4 py-1"
                                        >
                                            <Trash2 color="white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {products.links && (
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex space-x-2">
                            {products.links.map((link, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => Inertia.get(link.url)}
                                        className={`px-4 py-2 rounded ${
                                            link.active
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        } hover:bg-blue-600`}
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
                                onClick={handleDelete}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transform hover:scale-105"
                            >
                                Delete
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
        </>
    );
};

export default ProductTable;
