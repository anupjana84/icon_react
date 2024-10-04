import React, { useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";

const ProductDetails = ({ product }) => {
    const [activeTab, setActiveTab] = useState("details");
    const [thumbnail, setThumbnail] = useState(product.thumbnail_image);

    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1) and pad
        const year = date.getFullYear(); // Get full year

        return `${day}/${month}/${year}`;
    };
    const image = JSON.parse(product.image);

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader
                title="Product > Details"
                link="/products"
                linkName="Back"
            />

            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="lg:flex gap-6">
                    {/* Left Section - Product Images */}
                    <div className="lg:w-1/2 w-full">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <img
                                src={thumbnail}
                                alt={product.name}
                                className="w-full object-cover rounded-lg"
                            />
                        </div>
                        <div className=" flex justify-between md:grid md:grid-cols-4 space-x-2 mt-4">
                            {/* Thumbnail Images */}
                            {image &&
                                image.map((img, index) => (
                                    <img
                                        onClick={() => setThumbnail(img)}
                                        key={index}
                                        src={img}
                                        alt={`Product Thumbnail ${index}`}
                                        className="w-20 h-20 object-cover border p-1 rounded-lg m-auto"
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Right Section - Product Information */}
                    <div className="md:w-1/2 w-full">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {product.name}
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Model: {product.model}
                        </p>
                        <p className="text-sm text-gray-600 ">
                            Brand: {product.brand.name}
                        </p>
                        <div className="my-4">
                            <p className="text-xl font-bold text-gray-900">
                                Sale price: ₹{product.sale_price}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                                Purchase price: ₹{product.purchase_price}
                            </p>
                            {/* {product.purchase_price && (
                                <p className="text-sm text-gray-500 line-through">
                                    Purchase Price: ₹{product.purchase_price}
                                </p>
                            )} */}
                            {product.discount && (
                                <p className="text-sm text-green-500">
                                    Discount: {product.discount}%
                                </p>
                            )}
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
                        </div>

                        {/* Stock & Info */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                HSN Code: {product.hsn_code}
                            </p>
                            <p className="text-sm text-gray-600">
                                GST: {product.product_gst}%
                            </p>
                            <p className="text-sm text-gray-600">
                                Available From:{" "}
                                {formatDate(product.available_from)}
                            </p>
                            <p className="text-sm text-gray-600">
                                Free Delivery: {product.free_delivery}
                            </p>
                            <p className="text-sm text-gray-600">
                                Quantity: {product.quantity}
                            </p>
                        </div>

                        {/* Tabs for more information */}
                        <div className="mt-6 border-b border-gray-200">
                            <nav className="flex space-x-4" aria-label="Tabs">
                                <button
                                    className={`px-3 py-2 text-sm font-medium ${
                                        activeTab === "details"
                                            ? "text-gray-900 border-b-2 border-black"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                    onClick={() => handleTabClick("details")}
                                >
                                    Purchase Details
                                </button>

                                <button
                                    className={`px-3 py-2 text-sm font-medium ${
                                        activeTab === "description"
                                            ? "text-gray-900 border-b-2 border-black"
                                            : "text-gray-500 hover:text-gray-700"
                                    }`}
                                    onClick={() =>
                                        handleTabClick("description")
                                    }
                                >
                                    Description
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === "details" && (
                                <div>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>
                                            <strong>Purchase Address:</strong>{" "}
                                            {product.purchase_address}
                                        </li>
                                        <li>
                                            <strong>Purchase Phone:</strong>{" "}
                                            {product.purchase_phone}
                                        </li>
                                        <li>
                                            <strong>
                                                Purchase Invoice No:
                                            </strong>{" "}
                                            {product.purchase_invoice_no}
                                        </li>
                                        <li>
                                            <strong>Purchase Date:</strong>{" "}
                                            {formatDate(product.purchase_date)}
                                        </li>
                                        <li>
                                            <strong>
                                                Purchase Receive Date:
                                            </strong>{" "}
                                            {formatDate(
                                                product.purchase_receive_date
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === "description" && (
                                <div>
                                    <p className="text-gray-600">
                                        {product.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetails;
