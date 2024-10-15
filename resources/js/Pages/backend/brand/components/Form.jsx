import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";

export const BrandModal = ({ isOpen, onClose, brand, setMessage }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
    });
    // console.log(brand);
    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && brand) {
            // Set initial values when the modal opens for editing
            setData({
                name: brand.name || "",
            });
        } else if (isOpen && !brand) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, brand]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (brand) {
            // console.log(brand.id);
            // Update the existing item
            put(`/brands/${brand.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Brand updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        } else {
            // Create a new item
            post("/brands", {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Brand created successfully!",
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
                        {brand ? "Edit Item" : "Create Item"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 text-black">
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.name
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            {processing
                                ? "Saving..."
                                : brand
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
