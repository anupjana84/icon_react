// src/components/ProductForm.js

import { useForm } from "@inertiajs/react";
import React, { useState } from "react";
import Alert from "./components/AlertMessage";

const ProductAddForm = ({ category, brands }) => {
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        sale_price: "",
        purchase_price: "",
        quantity: "",
        category: "",
        brand: "",
        model: "",
        point: "",
    });

    // console.log(brands);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products", {
            onSuccess: () => {
                reset(); // Reset the form
                setMessage({
                    visible: true,
                    description: "Product created successfully!",
                    type: "success",
                    title: "🎉 Success",
                });
            },
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-black font-bold mb-6">Product Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Category */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="category"
                        >
                            Item
                        </label>
                        <select
                            type="text"
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Item"
                        >
                            <option value="">Select Item</option>
                            {category &&
                                category.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category}
                            </p>
                        )}
                    </div>
                    {/* Brand */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="brand"
                        >
                            Brand
                        </label>
                        <select
                            id="brand"
                            name="brand"
                            value={data.brand}
                            onChange={(e) => setData("brand", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                            <option value="">Select Brand</option>
                            {brands &&
                                brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                        </select>
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.brand}
                            </p>
                        )}
                        {/* <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Brand"
                        /> */}
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Model */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="model"
                        >
                            Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            value={data.model}
                            onChange={(e) => setData("model", e.target.value)}
                            className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                errors.model
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                            }`}
                            placeholder="Enter Model"
                        />
                        {errors.model && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.model}
                            </p>
                        )}
                    </div>
                    {/* Quantity */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="quantity"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={(e) =>
                                setData("quantity", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="0"
                        />
                        {errors.quantity && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.quantity}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Purchase Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="purchase_price"
                        >
                            Purchase Price
                        </label>
                        <input
                            type="number"
                            id="purchase_price"
                            name="purchase_price"
                            value={data.purchase_price}
                            onChange={(e) =>
                                setData(
                                    "purchase_price",
                                    parseFloat(e.target.value)
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="0"
                        />
                        {errors.purchase_price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.purchase_price}
                            </p>
                        )}
                    </div>
                    {/* Sale Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="sale_price"
                        >
                            Sale Price
                        </label>
                        <input
                            type="number"
                            id="sale_price"
                            name="sale_price"
                            value={data.sale_price}
                            onChange={(e) =>
                                setData(
                                    "sale_price",
                                    parseFloat(e.target.value)
                                )
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="0"
                        />
                        {errors.sale_price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.sale_price}
                            </p>
                        )}
                    </div>
                </div>

                {/* Point */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="point"
                        >
                            Point
                        </label>
                        <input
                            type="number"
                            id="point"
                            name="point"
                            value={data.point}
                            onChange={(e) => setData("point", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Point"
                        />
                        {errors.point && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.point}
                            </p>
                        )}
                    </div>

                    {/* Free Delivery */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="free_delivery"
                        >
                            Free Delivery
                        </label>
                        <select
                            id="free_delivery"
                            name="free_delivery"
                            value={data.free_delivery}
                            onChange={(e) =>
                                setData("free_delivery", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                            <option value="">Select</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {errors.free_delivery && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.free_delivery}
                            </p>
                        )}
                    </div>
                </div>

                {/* Submit Button */}

                <div className="w-full">
                    <button
                        type="submit"
                        className={`bg-blue-500 w-full text-white px-4 py-2 rounded-lg ${
                            processing
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        }`}
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Uploading...
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}
        </div>
    );
};

export default ProductAddForm;
