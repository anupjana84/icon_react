import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";

export const ItemModal = ({ isOpen, onClose, item, setMessage }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        hsn_code: "",
        gst: "",
    });

    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && item) {
            // Set initial values when the modal opens for editing
            setData({
                name: item.name || "",
                hsn_code: item.hsn_code || "",
                gst: item.gst || "",
            });
        } else if (isOpen && !item) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, item]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (item) {
            console.log(item.id);
            // Update the existing item
            put(`/items/${item.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Item updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        } else {
            // Create a new item
            post("/items", {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Item created successfully!",
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
                        {item ? "Edit Item" : "Create Item"}
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

                    <div className="mb-4">
                        <label
                            htmlFor="hsn_code"
                            className="block text-sm font-medium text-gray-700"
                        >
                            HSN Code
                        </label>
                        <input
                            type="text"
                            id="hsn_code"
                            value={data.hsn_code}
                            onChange={(e) =>
                                setData("hsn_code", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.hsn_code
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.hsn_code && (
                            <span className="text-red-500 text-xs">
                                {errors.hsn_code}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="gst"
                            className="block text-sm font-medium text-gray-700"
                        >
                            GST
                        </label>
                        <input
                            type="text"
                            id="gst"
                            value={data.gst}
                            onChange={(e) => setData("gst", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.gst
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.gst && (
                            <span className="text-red-500 text-xs">
                                {errors.gst}
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
                                : item
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
