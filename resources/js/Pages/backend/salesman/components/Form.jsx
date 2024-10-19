import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";

export const SalesmanModal = ({ isOpen, onClose, salesman, setMessage }) => {
    console.log(salesman);
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
        address: "",
        phone: "",
        password: "",
        point: "",
        other_point: "",
        status: "",
        wpnumber: "",
        status: "",
    });
    // console.log(company);
    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && salesman) {
            // Set initial values when the modal opens for editing
            setData({
                name: salesman.user.name || "",
                address: salesman.user.address || "",
                phone: salesman.user.phone || "",
                point: salesman.point || 0,
                other_point: salesman.other_point || 0,
                status: salesman.status || "",
                wpnumber: salesman.user.wpnumber || "",
                status: salesman.status || 1,
            });
        } else if (isOpen && !salesman) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, salesman]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (salesman) {
            // console.log(item.id);
            // Update the existing item
            console.log(data);
            put(`/salesmans/${salesman.user.id}`, {
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
            console.log(data);
            post("/salesmans", {
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
                        {salesman ? "Edit Salesman" : "Create Salesman"}
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
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
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
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
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
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
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
                                htmlFor="other_point"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Other Points
                            </label>
                            <input
                                type="number"
                                id="other_point"
                                value={data.other_point}
                                onChange={(e) =>
                                    setData("other_point", e.target.value)
                                }
                                className={`mt-1 block w-full px-3 py-2 border ${
                                    errors.other_point
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                            />
                            {errors.other_point && (
                                <span className="text-red-500 text-xs">
                                    {errors.other_point}
                                </span>
                            )}
                        </div>
                        {!salesman && (
                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`mt-1 block w-full px-3 py-2 border ${
                                        errors.password
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                />
                                {errors.password && (
                                    <span className="text-red-500 text-xs">
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                        )}
                        {salesman && (
                            <div className="mb-4">
                                <label
                                    htmlFor="status"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    className={`mt-1 block w-full px-3 py-2 border ${
                                        errors.other_point
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    name="status"
                                    id="status"
                                >
                                    <option value="">Select</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                                {errors.status && (
                                    <span className="text-red-500 text-xs">
                                        {errors.status}
                                    </span>
                                )}
                            </div>
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
                                : salesman
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
