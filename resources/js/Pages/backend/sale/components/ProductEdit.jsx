import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import PaymentSettings from "../../settings/pages/PaymentSettings";
import Alert from "../../../../layout/components/AlertMessage";

export const ProductEdit = ({ isOpen, onClose, sale, setMessage }) => {
    // console.log(sale.gst_number);
    const { data, setData, put, processing, errors, reset } = useForm({
        sale_id: "",
        gstNumber: "",
        finance: "",
        discount: "",
        total: "",
        payment: "",
        online: "",
        cash: "",
        gst: "",
        custId: "",
        items: [
            {
                id: "",
                quantity: "",
                warranty: "",
                total: "",
                gst: "",
                discount: "",
                price: "",
                point: "",
            },
        ],
    });
    console.log(errors);
    useEffect(() => {
        if (sale) {
            setData({
                sale_id: sale.id,
                items: sale.sales_items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    warranty: item.warranty,
                    total: calculateTotal(
                        item.product.sale_price,
                        item.product.category.gst,
                        item.product.details?.discount || 0,
                        item.quantity
                    ),
                    discount: parseInt(item.product.details?.discount) || 0,
                    price: parseInt(item.product.sale_price),
                    gst: parseInt(item.product.category.gst),
                    point: parseInt(item.product.point),
                })),
                gstNumber: sale.gst_number || "",
                finance: sale.sales_payment.finance || "",
                discount: parseInt(sale.discount),
                total: parseInt(sale.total),
                online: parseInt(sale.sales_payment.online_payment) || 0,
                cash: parseInt(sale.sales_payment.cash_payment),
                gst: sale.gst,
                custId: sale.customer_id || null,
                totalPoints: totalPoints || 0,
                prevPoints: sale.sales_items.reduce(
                    (acc, item) =>
                        acc + parseInt(item.product.point) * item.quantity,
                    0
                ),
            });
        }
        // Check if the modal is open and if an item is provided for editing
    }, [isOpen, sale]);
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...data.items]; // Clone the current items
        updatedItems[index][field] = value; // Update the specific field for the current index
        setData("items", updatedItems); // Update the form state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/sales/${sale.id}`, {
            onSuccess: () => {
                onClose();
                setMessage({
                    visible: true,
                    description: "Sale updated successfully!",
                    type: "success",
                    title: "Success",
                });
            },
        });
    };

    const calculateTotal = (price, gst, discount, quantity) => {
        // console.log(price, gst, discount, quantity);
        const gstAmount = (price * gst) / 100;
        const discountAmount = (price * discount) / 100;
        // console.log(gstAmount, discountAmount);
        const total = (parseInt(price) + gstAmount - discountAmount) * quantity;

        return parseInt(total);
    };
    const totalPoints = data.items.reduce(
        (acc, item) => acc + parseInt(item.point) * item.quantity,
        0
    );

    const grandTotal = data.items.reduce(
        (acc, item) =>
            acc +
            parseInt(
                calculateTotal(
                    item.price,
                    item.gst,
                    item.discount,
                    item.quantity
                )
            ),
        0
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg ">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-black">
                        {"Edit Sales Items"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 text-black">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse mb-3">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Product Name
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Price
                                    </th>

                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        GST
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Discount
                                    </th>

                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Quantity
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Warranty
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.sales_items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.product.brand.name} -{" "}
                                            {item.product.category.name}
                                        </td>

                                        <td className="p-4 text-gray-800 text-center">
                                            ₹
                                            {parseInt(
                                                item.price
                                            ).toLocaleString()}
                                        </td>

                                        <td className="p-4 text-gray-800 text-center">
                                            {parseInt(
                                                item.product.category.gst
                                            ).toLocaleString()}
                                            %
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            {parseInt(
                                                item.product.details
                                                    ?.Discount || 0
                                            ).toLocaleString()}
                                            %
                                        </td>

                                        {/* Quantity as an input field */}
                                        <td className="p-4 text-gray-800 text-center">
                                            <input
                                                type="number"
                                                value={
                                                    data.items[index].quantity
                                                }
                                                onChange={(e) => {
                                                    {
                                                        handleItemChange(
                                                            index,
                                                            "quantity",
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        );
                                                        handleItemChange(
                                                            index,
                                                            "total",
                                                            calculateTotal(
                                                                item.price,
                                                                item.product
                                                                    .category
                                                                    .gst,
                                                                item.product
                                                                    .details
                                                                    ?.discount ||
                                                                    0,
                                                                parseInt(
                                                                    data.items[
                                                                        index
                                                                    ].quantity
                                                                )
                                                            )
                                                        );
                                                    }
                                                }}
                                                className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                    errors[
                                                        `items.${index}.quantity`
                                                    ]
                                                        ? "border-red-500 focus:ring-red-400"
                                                        : "border-gray-300 focus:ring-blue-400"
                                                }`}
                                                placeholder="Quantity"
                                                min={1}
                                                max={item.product.quantity}
                                            />
                                        </td>
                                        {/* Warranty as an input field */}
                                        <td className="p-4 text-gray-800 text-center">
                                            <select
                                                value={
                                                    data.items[index].warranty
                                                }
                                                onChange={(e) => {
                                                    handleItemChange(
                                                        index,
                                                        "warranty",
                                                        e.target.value
                                                    );
                                                }}
                                                className={`w-full px-2 py-[6px] cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                    errors[
                                                        `items.${index}.warranty`
                                                    ]
                                                        ? "border-red-500 focus:ring-red-400"
                                                        : "border-gray-300 focus:ring-blue-400"
                                                }`}
                                            >
                                                <option value="">Select</option>
                                                <option value="7 Day">
                                                    7 Day
                                                </option>
                                                <option value="1 Month">
                                                    1 Months
                                                </option>
                                                <option value="3 Month">
                                                    3 Months
                                                </option>
                                                <option value="6 Months">
                                                    6 Months
                                                </option>
                                                <option value="10 Months">
                                                    10 Months
                                                </option>
                                                <option value="1 Year">
                                                    1 Year
                                                </option>
                                                <option value="2 Years">
                                                    2 Years
                                                </option>
                                                <option value="3 Years">
                                                    3 Years
                                                </option>
                                                <option value="5 Years">
                                                    5 Years
                                                </option>
                                                <option value="Company Weranty">
                                                    Company Weranty
                                                </option>
                                            </select>
                                        </td>
                                        {/* Total Price Row */}
                                        <td className="p-4 text-gray-800 text-center">
                                            {data.items[index].total}
                                        </td>
                                    </tr>
                                ))}
                                {/* Grand Total Row */}
                                {/* <tr className="bg-gray-100 w-full">
                                    <td
                                        colSpan="1"
                                        className="p-4 font-semibold text-gray-800 text-center"
                                    >
                                        Total
                                    </td>
                                    <td
                                        colSpan="5"
                                        className="p-4 font-semibold text-gray-800"
                                    ></td>
                                    <td className="p-4 font-semibold text-gray-800 text-center">
                                        ₹{grandTotal.toLocaleString()}
                                    </td>
                                </tr>
                                <tr className="bg-gray-100 w-full">
                                    <td
                                        colSpan="1"
                                        className="p-4 font-semibold text-gray-800 text-center"
                                    >
                                        Discount
                                    </td>
                                    <td
                                        colSpan="5"
                                        className="p-4 font-semibold text-gray-800"
                                    ></td>
                                    <td className="p-4 font-semibold text-red-500 text-center">
                                        - ₹
                                        {parseInt(
                                            sale.discount ?? 0
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                                <tr className="bg-gray-100 w-full">
                                    <td
                                        colSpan="1"
                                        className="p-4 font-semibold text-gray-800 text-center"
                                    >
                                        Grand Total
                                    </td>
                                    <td
                                        colSpan="5"
                                        className="p-4 font-semibold text-gray-800"
                                    ></td>
                                    <td className="p-4 font-semibold text-green-500 text-center">
                                        ₹
                                        {(
                                            grandTotal -
                                            parseInt(sale.discount ?? 0)
                                        ).toLocaleString()}
                                    </td>
                                </tr> */}
                            </tbody>
                        </table>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-x-2 px-2">
                            <div className="relative z-0 w-full group mb-2">
                                {/* <div
                                    className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md `}
                                >
                                    Total Amount: ₹{grandTotal}
                                </div> */}
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="total"
                                >
                                    Total
                                </label>
                                <input
                                    type="number"
                                    id="total"
                                    name="total"
                                    value={grandTotal}
                                    className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md `}
                                    placeholder="Enter Total Amount"
                                    disabled
                                />
                            </div>
                            <div className="relative z-0 w-full group mb-2">
                                <label className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500">
                                    Discounted Total
                                </label>
                                <div
                                    className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md `}
                                >
                                    Discounted Total: ₹
                                    {grandTotal - data.discount}
                                </div>
                            </div>
                            <div className="relative z-0 w-full group mb-2">
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="discount"
                                >
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={data.discount}
                                    max={parseInt(data.total)}
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
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="gst"
                                >
                                    GST
                                </label>
                                <select
                                    id="gst"
                                    name="gst"
                                    value={data.gst}
                                    onChange={(e) =>
                                        setData("gst", e.target.value)
                                    }
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
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="cash"
                                >
                                    Cash Payment
                                </label>
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
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="online"
                                >
                                    Online Paymet
                                </label>
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
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="gstNumber"
                                >
                                    GST Number
                                </label>
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
                                <label
                                    className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                    htmlFor="finance"
                                >
                                    Finance
                                </label>
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
                                    <option value="hdb_finance">
                                        HDB Finance
                                    </option>
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
                            {processing ? "Saving..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
