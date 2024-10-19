// src/components/ProductForm.js

import { useForm, router } from "@inertiajs/react";
import React, { useState } from "react";
import { OctagonX } from "lucide-react";
import Alert from "./components/AlertMessage";

const ProductEditForm = ({ product }) => {
    // console.log(product);
    const [products, setProducts] = useState([]);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    const [formData, setFormData] = useState({
        image_url: [],
        image_url_thum: null,
        thumbnail: "",
    });
    // console.log(product);
    const { data, setData, patch, processing, errors, reset } = useForm({
        sale_price: parseFloat(product.sale_price),
        purchase_price: parseFloat(product.purchase_price),
        quantity: product.quantity,
        category: product.category.id,
        brand: product.brand.id,
        description: product.description ?? "",
        status: product.status,
        available_from: product.available_from ?? "",
        thumbnail: product.thumbnail ?? "",
        warranty: product.warranty ?? "",
        image_url: product.image ?? [],
        model: product.model,
        point: product.point,
        discount: parseFloat(product.discount) ?? 0,
    });

    // console.log(brands);

    const handleImagesChange = (event) => {
        const files = Array.from(event.target.files);
        setFormData((prevData) => ({
            ...prevData,
            image_url: [...prevData.image_url, ...files],
        }));
    };

    const handleRemoveImage = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            image_url: prevData.image_url.filter((_, i) => i !== index),
        }));
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        // console.log(file);

        // if (file.size > 1024 * 1024) {
        //     errorMessage("File size must be less than 1MB");
        //     return;

        //     // setStatus('Invalid file address');
        // }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        // console.log(reader);
        reader.onload = () => {
            setFormData({
                ...formData,
                thumbnail: e.target.files[0],
            });
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        data.image_url = formData.image_url;
        data.thumbnail = formData.thumbnail;
        setProducts(data);
        patch(`/products/${product.id}`, products);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-black font-bold mb-6">
                Product Edit Form
            </h1>
            <form onSubmit={handleSubmit}>
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
                    {/* Point */}
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
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
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
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {errors.free_delivery && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.free_delivery}
                            </p>
                        )}
                    </div>

                    {/* Purchase Discount */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="discount"
                        >
                            Discount
                        </label>
                        <input
                            type="number"
                            step="1"
                            id="discount"
                            name="discount"
                            value={data.discount}
                            onChange={(e) =>
                                setData("discount", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Discount"
                        />
                        {errors.discount && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.discount}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6"></div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={data.status}
                            onChange={(e) => {
                                setData("status", e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                            <option value="active" className="text-black">
                                Active
                            </option>
                            <option value="inactive" className="text-black">
                                Inactive
                            </option>
                        </select>
                        {errors.status && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.status}
                            </p>
                        )}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="warranty"
                        >
                            Warranty
                        </label>
                        <select
                            id="status"
                            name="warranty"
                            value={data.warranty}
                            onChange={(e) => {
                                setData("warranty", e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        >
                            <option value="" className="text-black">
                                Select Warranty
                            </option>
                            <option value="3 month" className="text-black">
                                3 month
                            </option>
                            <option value="6 month" className="text-black">
                                6 month
                            </option>
                            <option value="1 year" className="text-black">
                                1 year
                            </option>
                            <option value="2 year" className="text-black">
                                2 year
                            </option>
                            <option value="3 year" className="text-black">
                                3 year
                            </option>
                            <option value="4 year" className="text-black">
                                4 year
                            </option>
                        </select>
                        {errors.warranty && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.warranty}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Description */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Description"
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    <div className="relative z-0 w-full  group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="available_from"
                        >
                            Available From
                        </label>
                        <input
                            type="date"
                            id="available_from"
                            name="available_from"
                            value={data.available_from}
                            onChange={(e) =>
                                setData("available_from", e.target.value)
                            }
                            className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                errors.available_from
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                            }`}
                        />
                        {errors.available_from && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.available_from}
                            </p>
                        )}
                    </div>
                </div>

                {/* Image URL */}

                <div className="mb-6">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="thumbnail"
                    >
                        Image
                    </label>

                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        onChange={handleThumbnailChange}
                        className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md bg-white"
                    />
                    {errors.thumbnail && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.thumbnail}
                        </p>
                    )}
                </div>
                {formData.thumbnail && (
                    <div className="mb-6">
                        <h4 className="text-blue-600 font-bold mb-2">
                            Thumbnail Image Preview:
                        </h4>
                        <img
                            src={
                                typeof formData.thumbnail === "string"
                                    ? formData.thumbnail
                                    : URL.createObjectURL(formData.thumbnail)
                            }
                            alt="Thumbnail Preview"
                            className="w-32 h-32 object-cover rounded-lg shadow-lg transition-transform duration-200 transform hover:scale-105"
                        />
                    </div>
                )}

                <div className="mb-6">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="image_url"
                    >
                        Select Multiple Images
                    </label>
                    <input
                        type="file"
                        id="image_url"
                        name="image_url"
                        multiple
                        onChange={handleImagesChange}
                        className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md bg-white"
                    />
                    {errors.image_url && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image_url}
                        </p>
                    )}
                </div>

                {formData.image_url.length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-red-500 font-bold mb-2">
                            Selected Image Previews:
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {formData.image_url.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative group m-auto"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Image ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg shadow-lg transition-transform duration-200 transform group-hover:scale-105"
                                    />
                                    <button
                                        className="absolute inset-0 flex items-center justify-center bg-red-500 text-white rounded-full opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
                                        onClick={() => handleRemoveImage(index)}
                                        style={{
                                            width: "24px", // Set a specific width
                                            height: "24px", // Set a specific height
                                            fontSize: "16px", // Adjust font size
                                            top: "50%", // Center vertically
                                            left: "50%", // Center horizontally
                                            transform: "translate(-50%, -50%)", // Offset to the center
                                        }}
                                    >
                                        <OctagonX />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Status */}

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

export default ProductEditForm;
