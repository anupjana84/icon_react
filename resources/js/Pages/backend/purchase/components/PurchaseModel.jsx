import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";

export const PurchaseModal = ({ isOpen, onClose, purchase, setMessage }) => {
    const [companies, setCompanies] = useState([]);
    const { data, setData, put, processing, errors, reset } = useForm({
        company_id: purchase?.company_id || "",
        purchase_date: purchase?.purchase_date || "",
        purchase_receive_date: purchase?.purchase_receive_date || "",
        purchase_invoice_no: purchase?.purchase_invoice_no || "",
        gst: purchase?.gst || "",
    });

    // console.log(data);

    useEffect(() => {
        async function fetchCompanies() {
            try {
                const response = await axios.get(`/all-companies`);
                setCompanies(response.data);
            } catch (error) {
                console.error("Error fetching companies:", error);
            }
        }
        if (isOpen) {
            fetchCompanies();
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (purchase) {
            put(`/purchases/${purchase.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                    setMessage({
                        visible: true,
                        description: "Purchase updated successfully!",
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
                        Edit Purchase
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
                            htmlFor="company_id"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Company
                        </label>
                        <select
                            id="company_id"
                            value={data.company_id}
                            onChange={(e) =>
                                setData("company_id", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.company_id
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            <option value="">Select a company</option>
                            {companies.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                        {errors.company_id && (
                            <span className="text-red-500 text-xs">
                                {errors.company_id}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="purchase_date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Purchase Date
                        </label>
                        <input
                            type="date"
                            id="purchase_date"
                            value={data.purchase_date}
                            onChange={(e) =>
                                setData("purchase_date", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.purchase_date
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.purchase_date && (
                            <span className="text-red-500 text-xs">
                                {errors.purchase_date}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="purchase_receive_date"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Purchase Receive Date
                        </label>
                        <input
                            type="date"
                            id="purchase_receive_date"
                            value={data.purchase_receive_date}
                            onChange={(e) =>
                                setData("purchase_receive_date", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.purchase_receive_date
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.purchase_receive_date && (
                            <span className="text-red-500 text-xs">
                                {errors.purchase_receive_date}
                            </span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="purchase_invoice_no"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Invoice Number
                        </label>
                        <input
                            type="text"
                            id="purchase_invoice_no"
                            value={data.purchase_invoice_no}
                            onChange={(e) =>
                                setData("purchase_invoice_no", e.target.value)
                            }
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.purchase_invoice_no
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.purchase_invoice_no && (
                            <span className="text-red-500 text-xs">
                                {errors.purchase_invoice_no}
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
                        <select
                            id="gst"
                            value={data.gst}
                            onChange={(e) => setData("gst", e.target.value)}
                            className={`mt-1 block w-full px-3 py-2 border ${
                                errors.gst
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            <option value="">Select GST</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
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
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
