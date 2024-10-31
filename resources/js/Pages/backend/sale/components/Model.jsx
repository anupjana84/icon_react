import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";
import Index from "../../company/Index";

export const SalesModel = ({
    isOpen,
    onClose,
    data,
    setData,
    processing,
    errors,
    handelSubmit,
}) => {
    console.log(data);

    const [sTotal, setSTotal] = useState(0);

    useEffect(() => {
        // Calculate the total for each product and sum up for the grand total
        const calculateTotal = () => {
            let total = 0;

            data.rows.forEach((product) => {
                const rate = parseInt(product.rate || 0);
                const gst = parseInt(product.gst || 0);
                const discount = parseInt(product.discount || 0);

                // Calculate product total with GST and discount, excluding delivery
                const productTotal = parseInt(
                    parseInt(rate) +
                        (rate * gst) / 100 -
                        (rate * discount) / 100
                );

                total += productTotal;
            });

            setData("total", total);
        };

        calculateTotal();
    }, [data.rows]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg ">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-black"></h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>

                <div className="container mx-auto p-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 border-b">
                                    <th className="py-3 px-6 text-left font-semibold text-gray-600">
                                        Item
                                    </th>
                                    <th className="py-3 px-6 text-left font-semibold text-gray-600">
                                        Rate (₹)
                                    </th>
                                    <th className="py-3 px-6 text-left font-semibold text-gray-600">
                                        GST (%)
                                    </th>
                                    <th className="py-3 px-6 text-left font-semibold text-gray-600">
                                        Discount (%)
                                    </th>
                                    <th className="py-3 px-6 text-left font-semibold text-gray-600">
                                        Total (₹)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.rows.map((product, index) => {
                                    const rate = parseInt(product.rate || 0);
                                    const gst = parseInt(product.gst || 0);
                                    const discount = parseInt(
                                        product.discount || 0
                                    );
                                    // Calculate product total with GST and discount, excluding delivery
                                    const total = parseInt(
                                        parseInt(rate) +
                                            (rate * gst) / 100 -
                                            (rate * discount) / 100
                                    );

                                    return (
                                        <tr
                                            key={index}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-3 px-6 text-gray-700">
                                                {product.brand} -{" "}
                                                {product.category}
                                            </td>
                                            <td className="py-3 px-6 text-gray-700">
                                                ₹{parseInt(rate)}
                                            </td>
                                            <td className="py-3 px-6 text-gray-700">
                                                {gst}%
                                            </td>
                                            <td className="py-3 px-6 text-gray-700">
                                                {parseInt(discount)}%
                                            </td>
                                            <td className="py-3 px-6 text-gray-900 font-semibold">
                                                ₹{parseInt(total)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <form onSubmit={handelSubmit} className="p-4 text-black">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-2">
                        <div className="relative z-0 w-full group mb-2">
                            <div
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md `}
                            >
                                Total Amount: ₹{data.total}
                            </div>
                        </div>
                        <div className="relative z-0 w-full group mb-2">
                            <div
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md `}
                            >
                                Discounted Total: ₹{data.total - data.discount}
                            </div>
                        </div>
                        <div className="relative z-0 w-full group mb-2">
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                value={data.discount}
                                max={data.total}
                                onChange={(e) => {
                                    setData("discount", e.target.value);
                                }}
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.discount
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                                placeholder="Enter Discount"
                                min={0}
                            />
                            {errors.discount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.discount}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-2 group">
                            <select
                                id="gst"
                                name="gst"
                                value={data.gst}
                                onChange={(e) => setData("gst", e.target.value)}
                                className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.gst
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                            >
                                <option value="">Select GST</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            {errors.gst && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gst}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full group mb-2">
                            <input
                                type="number"
                                id="cash"
                                name="cash"
                                value={data.cash}
                                onChange={(e) =>
                                    setData("cash", e.target.value)
                                }
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.cash
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                                placeholder="Enter Cash Payment "
                                min={0}
                            />
                            {errors.cash && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cash}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full group mb-2">
                            <input
                                type="number"
                                id="online"
                                name="online"
                                value={data.online}
                                onChange={(e) =>
                                    setData("online", e.target.value)
                                }
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.online
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                                placeholder="Enter Online Payment"
                                min={0}
                            />
                            {errors.online && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.online}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full group mb-2">
                            <input
                                type="text"
                                id="gstNumber"
                                name="gstNumber"
                                value={data.gstNumber}
                                onChange={(e) =>
                                    setData("gstNumber", e.target.value)
                                }
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.gstNumber
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                                placeholder="Enter GST Number"
                                min={0}
                            />
                            {errors.gstNumber && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.gstNumber}
                                </p>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-2 group">
                            <select
                                id="finance"
                                name="finance"
                                value={data.finance}
                                onChange={(e) =>
                                    setData("finance", e.target.value)
                                }
                                className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.finance
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                            >
                                <option value="">Select Finance</option>
                                <option value="hdb_finance">HDB Finance</option>
                                <option value="bajaj_finance">
                                    BAJAJ Finance
                                </option>
                            </select>
                            {errors.finance && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.finance}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2">
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
                    </div>
                </form>
            </div>
        </div>
    );
};
