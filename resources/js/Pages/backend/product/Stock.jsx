// resources/js/Pages/ProductTable.jsx
import React, { useState } from "react";
import { Link, useForm, router } from "@inertiajs/react";
import BarcodeComponent from "../../../layout/components/Barcode";

// import PageHeader from "../../../layout/components/pageHeader";
const Stock = ({ product, selectedRole, startDate2, endDate2 }) => {
    // State for role and dates
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [role, setRole] = useState(selectedRole);
    const [startDate, setStartDate] = useState(startDate2 ?? "");
    const [endDate, setEndDate] = useState(endDate2 ?? "");
    const [error, setError] = useState("");

    const { get } = useForm();
    // Get today's date in `YYYY-MM-DD` format
    const today = new Date().toISOString().split("T")[0];
    // Handle role selection
    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);

        // Request server with the selected role
        get(`/product-stocks/${selectedRole}`);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    // Handle date changes
    const handleDateChange = (field, value) => {
        if (new Date(value) > new Date(today)) {
            setError("Date cannot be greater than today's date.");
            return;
        }

        if (field === "startDate") {
            if (endDate && value > endDate) {
                setError("Start date cannot be greater than end date.");
                return;
            }
            setStartDate(value);
            setError(""); // Clear any existing errors
        }

        if (field === "endDate") {
            if (startDate && value < startDate) {
                setError("End date cannot be less than start date.");
                return;
            }
            setEndDate(value);
            setError(""); // Clear any existing errors
        }

        // // Trigger request only if both dates are valid and provided
        // if (field === "startDate" && value && endDate) {
        //     get("/product-stocks", { params: { startDate: value, endDate } });
        // } else if (field === "endDate" && value && startDate) {
        //     get("/product-stocks", { params: { startDate, endDate: value } });
        // }
    };

    const handleSearch = () => {
        if (!startDate) {
            setError("Please select start date");
        } else if (startDate && !endDate) {
            get(`/product-stocks/nan/${startDate}/${today}`);
            setError(""); // Clear any existing errors
            setIsDropdownOpen(false);
        }
        // Trigger request only if both dates are valid and provided
        if (startDate && endDate) {
            get(`/product-stocks/nan/${startDate}/${endDate}`);
            setError(""); // Clear any existing errors
            setIsDropdownOpen(false);
        }
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

                        <div>
                            <div className="flex relative justify-between items-center mb-1 gap-2">
                                {/* Role Selection Dropdown */}
                                <select
                                    value={role}
                                    onChange={handleRoleChange}
                                    className="bg-gray-800 border border-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700"
                                >
                                    <option value="all">All Stocks</option>
                                    <option value="empty">Empty Stocks</option>
                                    <option value="new">New Stocks</option>
                                    <option value="available">
                                        Available Stock
                                    </option>
                                    <option value="low">Low Stock</option>
                                    <option value="six_months">
                                        6 Months Old
                                    </option>
                                    <option value="one_year">1 Year Old</option>
                                </select>

                                <div className="relative z-[1000]">
                                    {/* Dropdown Button */}
                                    <button
                                        onClick={toggleDropdown}
                                        className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                                    >
                                        Filter by Date
                                    </button>

                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div
                                            style={{
                                                position: "fixed",
                                                top: "120px",
                                                right: "30px",
                                                width: "250px",
                                                zIndex: 1000,
                                            }} // Adjust based on your layout
                                            className="absolute top-full flex flex-col justify-normal items-center right-0 mt-2 bg-gray-900/80 border border-gray-600 p-4 rounded-lg shadow-lg z-[1000]"
                                        >
                                            <input
                                                type={
                                                    startDate ? "date" : "text"
                                                }
                                                value={startDate}
                                                onFocus={(e) =>
                                                    (e.target.type = "date")
                                                }
                                                onBlur={(e) => {
                                                    if (!startDate)
                                                        e.target.type = "text";
                                                }}
                                                onChange={(e) =>
                                                    handleDateChange(
                                                        "startDate",
                                                        e.target.value
                                                    )
                                                }
                                                className={`bg-gray-800/70 border ${
                                                    error
                                                        ? "border-red-500"
                                                        : "border-gray-600"
                                                } text-white w-full py-2 px-2 rounded-lg focus:outline-none`}
                                                placeholder="Start Date"
                                            />
                                            <input
                                                type={endDate ? "date" : "text"}
                                                value={endDate}
                                                onFocus={(e) =>
                                                    (e.target.type = "date")
                                                }
                                                onBlur={(e) => {
                                                    if (!endDate)
                                                        e.target.type = "text";
                                                }}
                                                onChange={(e) =>
                                                    handleDateChange(
                                                        "endDate",
                                                        e.target.value
                                                    )
                                                }
                                                className={`mt-2 bg-gray-800/70 border ${
                                                    error
                                                        ? "border-red-500"
                                                        : "border-gray-600"
                                                } text-white w-full py-2 px-2 rounded-lg focus:outline-none`}
                                                placeholder="End Date"
                                            />
                                            {/* Error Message */}
                                            {error && (
                                                <div className="text-red-500 text-sm ">
                                                    {error}
                                                </div>
                                            )}
                                            <button
                                                onClick={handleSearch}
                                                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
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
                                        Sale Price
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
                                            {parseInt(
                                                parseInt(product.sale_price) +
                                                    (parseInt(
                                                        product.sale_price
                                                    ) *
                                                        parseInt(
                                                            product.category.gst
                                                        )) /
                                                        100
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
