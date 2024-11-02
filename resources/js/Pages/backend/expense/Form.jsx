import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";

export const ExpenseModal = ({ isOpen, onClose, expense, setMessage }) => {
    console.log(expense);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        category: "",
        amount: "",
        payment_method: "",
        note: "",
    });

    useEffect(() => {
        // Check if the modal is open and if an item is provided for editing
        if (isOpen && expense) {
            // Set initial values when the modal opens for editing
            setData({
                category: expense.category || "",
                amount: parseInt(expense.amount) || "",
                payment_method: expense.payment_method || "",
                note: expense.note || "",
            });
        } else if (isOpen && !expense) {
            // Reset the form if we're creating a new item
            reset();
        }
    }, [isOpen, expense]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (expense) {
            console.log(expense.id);
            // Update the existing item
            put(`/expenses/${expense.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Expense updated successfully!",
                        type: "success",
                        title: "Success",
                    });
                },
            });
        } else {
            // Create a new item
            post("/expenses", {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Expense created successfully!",
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
                        {expense ? "Edit Expense" : "Create Expense"}
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
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Category
                        </label>
                        <input
                            type="text"
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
                        />
                        {errors.category && (
                            <span className="text-red-500 text-xs">
                                {errors.category}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.amount
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.amount && (
                            <span className="text-red-500 text-xs">
                                {errors.amount}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="payment_method"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Payment Method
                        </label>
                        <select
                            type="text"
                            id="payment_method"
                            value={data.payment_method}
                            onChange={(e) =>
                                setData("payment_method", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.payment_method
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="cash">Cash</option>
                            <option value="online">Online</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.payment_method && (
                            <span className="text-red-500 text-xs">
                                {errors.payment_method}
                            </span>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Notes
                        </label>
                        <input
                            type="text"
                            id="note"
                            value={data.note}
                            onChange={(e) => setData("note", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.note
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.note && (
                            <span className="text-red-500 text-xs">
                                {errors.note}
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
                                : expense
                                ? "Update"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
