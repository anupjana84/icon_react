import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";
import axios from "axios";

export const ProductModal = ({ isOpen, onClose, product, setMessage }) => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const { data, setData, put, processing, errors, reset } = useForm({
        sale_price: "",
        purchase_price: "",
        quantity: "",
        category: "",
        brand: "",
        model: "",
        discount: "",
        point: "",
        free_delivery: "",
    });
    console.log(product);
    async function fetch() {
        await axios
            .get("/all-brands-items")
            .then((res) => {
                setCategories(res.data.category);
                setBrands(res.data.brands);
            })
            .catch((e) => {
                console.log(e);
            });
    }
    useEffect(() => {
        if (isOpen) {
            setData({
                sale_price: parseInt(product.sale_price),
                purchase_price: parseInt(product.purchase_price),
                quantity: parseInt(product.quantity),
                category: product.category.id,
                brand: product.brand.id,
                model: product.model,
                discount: parseInt(product.discount),
                point: parseInt(product.point),
                free_delivery: product.free_delivery,
            });
            fetch();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (product) {
            put(`/purchases-product/${product.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Product updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-black">
                        {"Edit Product"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 text-black">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-2">
                        {/* Category */}
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) =>
                                    setData("category", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.category
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            >
                                <option value="">Select a categorie</option>
                                {categories.map((categorie) => (
                                    <option
                                        key={categorie.id}
                                        value={categorie.id}
                                    >
                                        {categorie.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <span className="text-red-500 text-xs">
                                    {errors.category}
                                </span>
                            )}
                        </div>

                        {/* Brand */}
                        <div className="mb-4">
                            <label
                                htmlFor="brand"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Brand
                            </label>
                            <select
                                id="brand"
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.brand
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            >
                                <option value="">Select a brands</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {errors.brand && (
                                <span className="text-red-500 text-xs">
                                    {errors.brand}
                                </span>
                            )}
                        </div>

                        {/* Model */}
                        <div className="mb-4">
                            <label
                                htmlFor="model"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Model
                            </label>
                            <input
                                type="text"
                                id="model"
                                value={data.model}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.model
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.model && (
                                <span className="text-red-500 text-xs">
                                    {errors.model}
                                </span>
                            )}
                        </div>

                        {/* Purchase Price */}
                        <div className="mb-4">
                            <label
                                htmlFor="purchase_price"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Purchase Price
                            </label>
                            <input
                                type="number"
                                id="purchase_price"
                                value={data.purchase_price}
                                onChange={(e) =>
                                    setData("purchase_price", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.purchase_price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.purchase_price && (
                                <span className="text-red-500 text-xs">
                                    {errors.purchase_price}
                                </span>
                            )}
                        </div>

                        {/* Discount */}
                        <div className="mb-4">
                            <label
                                htmlFor="discount"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Discount
                            </label>
                            <input
                                type="number"
                                id="discount"
                                value={data.discount}
                                onChange={(e) =>
                                    setData("discount", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.discount
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.discount && (
                                <span className="text-red-500 text-xs">
                                    {errors.discount}
                                </span>
                            )}
                        </div>

                        {/* Sale Price */}
                        <div className="mb-4">
                            <label
                                htmlFor="sale_price"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Sale Price
                            </label>
                            <input
                                type="number"
                                id="sale_price"
                                value={data.sale_price}
                                onChange={(e) =>
                                    setData("sale_price", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.sale_price
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.sale_price && (
                                <span className="text-red-500 text-xs">
                                    {errors.sale_price}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.quantity
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.quantity && (
                                <span className="text-red-500 text-xs">
                                    {errors.quantity}
                                </span>
                            )}
                        </div>

                        {/* Points */}
                        <div className="mb-4">
                            <label
                                htmlFor="point"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Points
                            </label>
                            <input
                                type="number"
                                id="point"
                                value={data.point}
                                onChange={(e) =>
                                    setData("point", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.point
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.point && (
                                <span className="text-red-500 text-xs">
                                    {errors.point}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="free_delivery"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Free Delivery
                            </label>
                            <input
                                type="text"
                                id="free_delivery"
                                value={data.free_delivery}
                                onChange={(e) =>
                                    setData("free_delivery", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.free_delivery
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.free_delivery && (
                                <span className="text-red-500 text-xs">
                                    {errors.free_delivery}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`${
                                processing ? "bg-blue-300" : "bg-blue-600"
                            } text-white px-4 py-2 rounded-md`}
                        >
                            {processing ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
