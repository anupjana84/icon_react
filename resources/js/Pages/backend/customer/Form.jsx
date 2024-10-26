import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";

export const CustomerModal = ({ isOpen, onClose, customer, setMessage }) => {
    console.log(customer);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone: "",
        wpnumber: "",
        pin: "",
    });
    // console.log(company);
    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && customer) {
            // Set initial values when the modal opens for editing
            setData({
                name: customer.name || "",
                address: customer.address || "",
                phone: customer.phone || "",
                wpnumber: customer.wpnumber || "",
                pin: customer.pin || "",
            });
        } else if (isOpen && !customer) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, customer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (customer) {
            // console.log(item.id);
            // Update the existing item
            put(`/customers/${customer.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Customer updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        } else {
            // Create a new item
            post("/customers", {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Customer created successfully!",
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
                        {customer ? "Edit Company" : "Create Company"}
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
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.phone
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-xs">
                                {errors.phone}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="wpnumber"
                            className="block text-sm font-medium text-gray-700"
                        >
                            WhatsApp Number
                        </label>
                        <input
                            type="text"
                            id="wpnumber"
                            value={data.wpnumber}
                            onChange={(e) =>
                                setData("wpnumber", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.wpnumber
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.wpnumber && (
                            <span className="text-red-500 text-xs">
                                {errors.wpnumber}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="pin"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Pin Code
                        </label>
                        <input
                            type="text"
                            id="pin"
                            value={data.pin}
                            onChange={(e) => setData("pin", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.pin
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.pin && (
                            <span className="text-red-500 text-xs">
                                {errors.pin}
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
                                : customer
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
