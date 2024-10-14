import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";

export const ItemModal = ({ isOpen, onClose, company, setMessage }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone_number: "",
        gst_number: "",
        total_due: "",
    });
    // console.log(company);
    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && company) {
            // Set initial values when the modal opens for editing
            setData({
                name: company.name || "",
                address: company.address || "",
                phone_number: company.phone_number || "",
                gst_number: company.gst_number || "",
                total_due: company.total_due || 0,
            });
        } else if (isOpen && !company) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, company]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (company) {
            // console.log(item.id);
            // Update the existing item
            put(`/companies/${company.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Company updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        } else {
            // Create a new item
            post("/companies", {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Company created successfully!",
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
                        {company ? "Edit Company" : "Create Company"}
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
                            Address
                        </label>
                        <input
                            type="text"
                            id="hsn_code"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.address
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.address && (
                            <span className="text-red-500 text-xs">
                                {errors.address}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="phone_number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>
                        <input
                            type="text"
                            id="phone_number"
                            value={data.phone_number}
                            onChange={(e) =>
                                setData("phone_number", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.phone_number
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.phone_number && (
                            <span className="text-red-500 text-xs">
                                {errors.phone_number}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="gst_number"
                            className="block text-sm font-medium text-gray-700"
                        >
                            GST Number
                        </label>
                        <input
                            type="text"
                            id="gst_number"
                            value={data.gst_number}
                            onChange={(e) =>
                                setData("gst_number", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.gst_number
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.gst_number && (
                            <span className="text-red-500 text-xs">
                                {errors.gst_number}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="total_due"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Total Due
                        </label>
                        <input
                            type="number"
                            id="total_due"
                            value={data.total_due}
                            onChange={(e) =>
                                setData("total_due", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.total_due
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.total_due && (
                            <span className="text-red-500 text-xs">
                                {errors.total_due}
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
                                : company
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
