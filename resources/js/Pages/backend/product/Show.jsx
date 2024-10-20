import React, { useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import BarcodeComponent from "../../../layout/components/Barcode";
import { formatDate } from "../../../helper/dateFormater";

const ProductDetails = ({ product }) => {
    const [activeTab, setActiveTab] = useState("details");
    const [thumbnail, setThumbnail] = useState(product.thumbnail_image);
    // console.log(product.available_from);
    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const image = JSON.parse(product.image);

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader
                title="Product » Details"
                link="/products"
                linkName="Back"
            />

            <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="lg:flex gap-6">
                    {/* Left Section - Product Images */}
                    <div className="lg:w-1/2 w-full">
                        <div className="bg-gray-100 p-4 rounded-lg relative">
                            <img
                                src={thumbnail ?? "/thumbnail.png"}
                                alt={product.name}
                                className="w-full object-cover rounded-lg"
                            />
                            <div className="px-2 py-2 absolute top-5 left-5 bg-white text-black rounded-lg">
                                <BarcodeComponent
                                    code={product.code}
                                    product={product}
                                />
                            </div>
                        </div>
                        <div className=" flex justify-between md:grid md:grid-cols-4 space-x-2 mt-4">
                            {/* Thumbnail Images */}
                            {image &&
                                image.map((img, index) => (
                                    <img
                                        onClick={() => setThumbnail(img)}
                                        key={index}
                                        src={img || "public/thumbnail.png"}
                                        alt={`Product Thumbnail ${index}`}
                                        className="w-20 h-20 object-cover border p-1 rounded-lg m-auto"
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Right Section - Product Information */}
                    <div className="md:w-1/2 w-full">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {product.category.name}
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Model: {product.model}
                        </p>
                        <p className="text-sm text-gray-600 ">
                            Brand: {product.brand.name}
                        </p>
                        <div className="my-4">
                            <p className="text-xl font-bold text-gray-900">
                                Sale price: ₹{parseFloat(product.sale_price)}
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                                Purchase price: ₹
                                {parseFloat(product.purchase_price)}
                            </p>
                            {/* {product.purchase_price && (
                                <p className="text-sm text-gray-500 line-through">
                                    Purchase Price: ₹{product.purchase_price}
                                </p>
                            )} */}
                            {product.discount && (
                                <p className="text-sm text-green-500">
                                    Discount: {parseFloat(product.discount)}%
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
                                HSN Code: {product.category.hsn_code ?? "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                                GST: {product.category.gst ?? 0}%
                            </p>
                            <p className="text-sm text-gray-600">
                                Available From:{" "}
                                {formatDate(product.available_from || "") ||
                                    "N/A"}
                            </p>
                            <p className="text-sm text-gray-600">
                                Free Delivery: {product.free_delivery}
                            </p>
                            <p className="text-sm text-gray-600">
                                Quantity: {product.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                                Warranty: {product.warranty ?? "N/A"}
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
                                            <strong>Purchase Name:</strong>{" "}
                                            {product.purchases[0].company.name}
                                        </li>
                                        <li>
                                            <strong>Purchase Address:</strong>{" "}
                                            {product.purchases[0].company
                                                .address ??
                                                "No purchase address"}
                                        </li>
                                        <li>
                                            <strong>Purchase Phone:</strong>{" "}
                                            {product.purchases[0].company
                                                .phone_number ??
                                                "No purchease phone"}
                                        </li>
                                        <li>
                                            <strong>
                                                Purchase Invoice No:
                                            </strong>{" "}
                                            {product.purchases[0]
                                                .purchase_invoice_no ??
                                                "No purchease invoice"}
                                        </li>
                                        <li>
                                            <strong>Purchase Date:</strong>{" "}
                                            {formatDate(
                                                product.purchases[0]
                                                    .purchase_date
                                            ) ?? "N/A"}
                                        </li>
                                        <li>
                                            <strong>
                                                Purchase Receive Date:
                                            </strong>{" "}
                                            {formatDate(
                                                product.purchases[0]
                                                    .purchase_receive_date
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === "description" && (
                                <div>
                                    <p className="text-gray-600">
                                        {product.description ??
                                            "No description"}
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
