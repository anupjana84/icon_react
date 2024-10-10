// src/components/ProductForm.js

import { useForm, router } from "@inertiajs/react";
import React, { useState } from "react";
import { OctagonX } from "lucide-react";
import Alert from "./components/AlertMessage";

const ProductEditForm = ({ category, brands, product }) => {
    console.log(product);
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
    const { data, setData, post, processing, errors, reset } = useForm({
        name: product.name,
        sale_price: product.sale_price,
        purchase_price: product.purchase_price,
        quantity: product.quantity,
        category: product.category.id,
        brand: product.brand.id,
        description: product.description,
        status: product.status,
        available_from: product.available_from,
        thumbnail: product.thumbnail,
        warranty: product.warranty,
        image_url: product.image,
        model: product.model,
        phone: product.phone,
        hsn_code: product.hsn_code,
        product_gst: product.product_gst,
        point: product.point,
        pruchase_name: product.purchase_name,
        pruchase_address: product.purchase_address,
        pruchase_phone: product.purchase_phone,
        pruchase_gst: product.purchase_gst,
        pruchase_invoice_no: product.purchase_invoice_no,
        pruchase_date: product.purchase_date,
        pruchase_receive_date: product.purchase_receive_date,
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
        // console.log(data);

        // post("/products");
        router.on("success", () => {
            document.querySelector('input[type="file"]').value = null; // Clear file input
            document.querySelector('input[type="date"]').value = ""; // Clear date input
            setFormData({
                image_url: [],
                image_url_thum: null,
                thumbnail: "",
            });
            reset(); // Reset the form
            setMessage({
                visible: true,
                description: "Product created successfully!",
                type: "success",
                title: "🎉 Success",
            });
        });
    };

    // const handleImagesChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     console.log(files);
    //     // const reader = new FileReader();
    //     // reader.readAsDataURL(files);
    //     // console.log(reader)
    //     // reader.onload = () => {

    //     //     setFormData({
    //     //         ...formData,
    //     //         image_url: files,
    //     //     });
    //     // };
    //     setFormData({
    //         ...formData,
    //         image_url: files, // Store the array of multiple images
    //     });
    // };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-black font-bold mb-6">Product Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Sale Price */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Product Name */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="name"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                errors.name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                            }`}
                            placeholder="Enter Product Name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

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
                </div>

                {/* Quantity */}
                <div className="grid md:grid-cols-2 md:gap-6">
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

                    {/* Category */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="category"
                        >
                            Category
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
                            placeholder="Category"
                        >
                            <option value="">Select Brand</option>
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
                </div>

                {/* Brand */}
                <div className="grid md:grid-cols-2 md:gap-6">
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

                    {/* Model */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="model"
                        >
                            Phone
                        </label>
                        <input
                            id="Phone"
                            name="Phone"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Model"
                        />
                        {errors.Phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.Phone}
                            </p>
                        )}
                    </div>
                </div>

                {/* HSN Code */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="hsn_code"
                        >
                            HSN Code
                        </label>
                        <input
                            id="hsn_code"
                            name="hsn_code"
                            value={data.hsn_code}
                            onChange={(e) =>
                                setData("hsn_code", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="HSN Code"
                        />
                        {errors.hsn_code && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.hsn_code}
                            </p>
                        )}
                    </div>

                    {/* Product GST */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="product_gst"
                        >
                            Product GST
                        </label>
                        <input
                            id="product_gst"
                            name="product_gst"
                            value={data.product_gst}
                            onChange={(e) =>
                                setData("product_gst", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Product GST"
                        />
                        {errors.product_gst && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.product_gst}
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

                    {/* Purchase Address */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="pruchase_address"
                        >
                            Purchase Address
                        </label>
                        <textarea
                            type="text"
                            id="pruchase_address"
                            name="pruchase_address"
                            value={data.pruchase_address}
                            onChange={(e) =>
                                setData("pruchase_address", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Purchase Address"
                        />
                        {errors.pruchase_address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_address}
                            </p>
                        )}
                    </div>
                </div>
                {/* purchase name*/}
                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Purchase Name */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="pruchase_name"
                        >
                            Purchase Name
                        </label>
                        <input
                            type="text"
                            id="pruchase_name"
                            value={data.pruchase_name}
                            onChange={(e) =>
                                setData("pruchase_name", e.target.value)
                            }
                            className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                errors.pruchase_name
                                    ? "border-red-500 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-400"
                            }`}
                            placeholder="Enter Purchase Name"
                        />
                        {errors.pruchase_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_name}
                            </p>
                        )}
                    </div>

                    {/* Purchase Phone */}
                    <div className="relative z-0 w-full mb-5 group">
                        <div className="relative z-0 w-full mb-5 group">
                            <label
                                className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                htmlFor="pruchase_phone"
                            >
                                Purchase Phone
                            </label>
                            <input
                                type="tel"
                                id="pruchase_phone"
                                name="pruchase_phone"
                                value={data.pruchase_phone}
                                onChange={(e) =>
                                    setData("pruchase_phone", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                                placeholder="Purchase Phone"
                            />
                            {errors.pruchase_phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pruchase_phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Purchase GST */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="pruchase_gst"
                        >
                            Purchase GST
                        </label>
                        <input
                            type="text"
                            id="pruchase_gst"
                            name="pruchase_gst"
                            value={data.pruchase_gst}
                            onChange={(e) =>
                                setData("pruchase_gst", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Purchase GST"
                        />
                        {errors.pruchase_gst && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_gst}
                            </p>
                        )}
                    </div>
                    {/* Purchase Invoice No */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500">
                            Purchase Invoice No
                        </label>
                        <input
                            type="text"
                            id="pruchase_invoice_no"
                            name="pruchase_invoice_no"
                            value={data.pruchase_invoice_no}
                            onChange={(e) =>
                                setData("pruchase_invoice_no", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            placeholder="Purchase Invoice No"
                        />
                        {errors.pruchase_invoice_no && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_invoice_no}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Purchase Date */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="pruchase_date"
                        >
                            Purchase Date
                        </label>
                        <input
                            type="date"
                            id="pruchase_date"
                            name="pruchase_date"
                            value={data.pruchase_date}
                            onChange={(e) =>
                                setData("pruchase_date", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        />
                        {errors.pruchase_date && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_date}
                            </p>
                        )}
                    </div>
                    {/* Purchase Receive Date */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="pruchase_receive_date"
                        >
                            Purchase Receive Date
                        </label>
                        <input
                            type="date"
                            id="pruchase_receive_date"
                            name="pruchase_receive_date"
                            value={data.pruchase_receive_date}
                            onChange={(e) =>
                                setData("pruchase_receive_date", e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        />
                        {errors.pruchase_receive_date && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pruchase_receive_date}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
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
                            step="0.01"
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
                    {/* Available From */}
                    <div className="relative z-0 w-full mb-5 group">
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
                            onChange={(e) => {
                                setData("available_from", e.target.value);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                        />
                        {errors.available_from && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.available_from}
                            </p>
                        )}
                    </div>
                </div>

                {/* SKU */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="sku"
                    >
                        SKU
                    </label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="SKU"
                    />
                </div> */}

                {/* Weight */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="weight"
                    >
                        Weight
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Weight"
                    />
                </div> */}

                {/* Color */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="color"
                    >
                        Color
                    </label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Color"
                    />
                </div> */}

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
                        className="bg-blue-500
                        w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Submit
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
