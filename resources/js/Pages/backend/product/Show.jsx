import React, { useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import BarcodeComponent from "../../../layout/components/Barcode";
import { formatDate } from "../../../helper/dateFormater";

const ProductDetails = ({ product }) => {
    console.log(product);
    const [activeTab, setActiveTab] = useState("details");
    const [thumbnail, setThumbnail] = useState(
        product[0].details?.thumbnail_image
    );
    // console.log(product.available_from);
    // Function to handle tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    function safeJsonParse(input, fallback = []) {
        if (typeof input === "undefined" || input === null || input === "") {
            return fallback; // Return the fallback value for undefined, null, or empty string
        }

        try {
            return JSON.parse(input);
        } catch (error) {
            console.error("JSON parsing error:", error);
            return fallback; // Return the fallback value on error
        }
    }

    // Usage
    const image = safeJsonParse(product[0].details?.image, []);

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
                            {/* <div className="px-2 py-2 absolute top-5 left-5 bg-white text-black rounded-lg">
                                <BarcodeComponent
                                    code={product.code}
                                    product={product}
                                />
                            </div> */}
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
                    <div className="lg:w-1/2 w-full">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {product[0].category.name}
                        </h1>
                        <p className="text-sm text-gray-600 ">
                            Brand: {product[0].brand.name}
                        </p>
                        <p className="text-sm text-gray-600 ">
                            Model: {product[0].model}
                        </p>
                        <div className="my-4">
                            {/* {product.purchase_price && (
                                <p className="text-sm text-gray-500 line-through">
                                    Purchase Price: ₹{product.purchase_price}
                                </p>
                            )} */}
                            {product[0].details && (
                                <p className="text-sm text-green-500">
                                    Discount:{" "}
                                    {parseFloat(product[0].details?.discount)}%
                                </p>
                            )}
                            <span
                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full 
                                ${
                                    product[0].details &&
                                    product[0].details.status === 1
                                        ? "bg-green-200 text-green-600"
                                        : "bg-red-200 text-red-600"
                                }`}
                            >
                                {product.details && product.details.status === 1
                                    ? "active"
                                    : "inactive"}
                            </span>
                        </div>

                        {/* Stock & Info */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">
                                {/* HSN Code: {product.category.hsn_code ?? "N/A"} */}
                            </p>
                            <p className="text-sm text-gray-600">
                                GST: {product[0].category.gst ?? 0}%
                            </p>
                            <p className="text-sm text-gray-600">
                                HSN Code: {product[0].category.hsn_code}
                            </p>

                            <p className="text-sm text-gray-600">
                                Warranty:{" "}
                                {product[0].details?.warranty ?? "N/A"}
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
                                <div className="w-full overflow-x-scroll ">
                                    <table className="min-w-full border-collapse border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-700">
                                                <th className="border border-gray-200 px-4 py-2">
                                                    Price
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2">
                                                    Sale Price
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2">
                                                    Quantity
                                                </th>
                                                <th className="border border-gray-200 px-4 py-2">
                                                    Free Delivery
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {product[0].products.map(
                                                (product, index) => (
                                                    <tr
                                                        key={index}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                                                            ₹
                                                            {parseInt(
                                                                product.purchase_price
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                                                            ₹
                                                            {parseInt(
                                                                product.sale_price
                                                            )}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                                                            {product.quantity}
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2 text-gray-700 text-center">
                                                            {
                                                                product.free_delivery
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === "description" && (
                                <div>
                                    <p className="text-gray-600">
                                        {product[0].details?.description ??
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
