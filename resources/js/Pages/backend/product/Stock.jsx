// resources/js/Pages/ProductTable.jsx
import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import BarcodeComponent from "../../../layout/components/Barcode";

// import PageHeader from "../../../layout/components/pageHeader";
const Stock = ({ product, selectedRole }) => {
    const [role, setRole] = useState(selectedRole);
    console.log(role);
    const { get } = useForm();

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        // Make a request to the server with the selected role
        get("/product-stocks/" + selectedRole);
    };
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
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
                                <option value="all">All Stocks</option>
                                <option value="empty">Empty Stocks</option>
                                <option value="new">New Stocks</option>
                                <option value="available">
                                    Available Stock{" "}
                                </option>
                                <option value="low">Low Stock</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {product.data && product.data.length > 0 && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-center">
                                        sl no.
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        code
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Item
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Brand
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        quantity
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        purchase Price
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        point
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        free dlivery
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {product.data.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-gray-200 hover:bg-gray-100"
                                    >
                                        <td className="py-3 px-6 text-center">
                                            {index + 1}.
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <BarcodeComponent
                                                code={product.code}
                                                product={product}
                                            />
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.category.name}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.brand.name}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.quantity}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            ₹
                                            {Number(product.sale_price).toFixed(
                                                0
                                            )}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.point}
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {product.free_delivery}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {product.data.length <= 0 && (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-center text-gray-600">
                                No products stocks found.
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

            {/* <BarcodeScanner /> */}
        </>
    );
};

export default Stock;
