import React, { useEffect, useState } from "react";
import { useForm, router } from "@inertiajs/react";
import Alert from "../../../../layout/components/AlertMessage";
import axios from "axios";

export const SalesModal = ({ isOpen, onClose, setMessage }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        payed: "",
        discount: "",
        total: "",
        gst: "",
        rows: [
            {
                code: "",
                category: "",
                brand: "",
                model: "",
                quantity: "",
                rate: "",
                saleRate: "",
                gst: 0,
                discount: 0,
                productQuantity: "",
                productId: "",
                total: "",
            },
        ],
    });
    // Function to calculate total rate
    const calculateTotalRate = (saleRate, userQuantity) => {
        const quantity = parseInt(userQuantity, 10);
        const rate = parseFloat(saleRate);
        return isNaN(quantity) || isNaN(rate) ? 0 : quantity * rate;
    };

    const calculateTotal = (total, gst, discount) => {
        const gstPrice = (parseInt(total) * parseInt(gst)) / 100;
        const discountPrice = (parseInt(total) * parseInt(discount)) / 100;
        const totalPrice = parseInt(total) + gstPrice - discountPrice;
        return totalPrice;
    };

    const handleInputChange = async (index, field, value) => {
        // console.log(index, field, value);
        const updatedRows = [...data.rows];
        updatedRows[index][field] = value;

        // console.log(value.length);

        // Check if the field being updated is 'code' and length is 19 characters
        if (field === "code" && value.length === 19) {
            try {
                const response = await axios.get(`/code/${value}`); // Fetch product by code
                const itemDetails = response.data;
                // console.log(itemDetails);
                // Automatically fill other fields if the item is found
                if (itemDetails) {
                    updatedRows[index] = {
                        ...updatedRows[index],
                        category: itemDetails.category.name,
                        brand: itemDetails.brand.name,
                        model: itemDetails.model,
                        rate: itemDetails.sale_price,
                        productQuantity: itemDetails.quantity,
                        quantity: 1,
                        saleRate: parseInt(itemDetails.sale_price),
                        productId: itemDetails.id || "",
                        gst: itemDetails.category.gst,
                        discount: itemDetails.details?.discount || 0,
                        total: calculateTotal(
                            itemDetails.sale_price,
                            itemDetails.category.gst,
                            itemDetails.details?.discount || 0
                        ),
                    };
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                // You can set an error message here if needed
            }
        }
        if (field === "quantity") {
            updatedRows[index].rate = calculateTotalRate(
                updatedRows[index].saleRate,
                updatedRows[index].quantity
            );

            updatedRows[index].total = calculateTotal(
                updatedRows[index].rate, // Use the updated rate
                updatedRows[index].gst,
                updatedRows[index].discount
            );
        }

        // If the input is filled and it's the last row, add a new row
        if (value !== "" && index === updatedRows.length - 1 && index < 2) {
            updatedRows.push({
                code: "",
                category: "",
                brand: "",
                model: "",
                quantity: "",
                rate: "",
                saleRate: "",
                gst: 0,
                discount: 0,
                productQuantity: "",
                productId: "",
                total: "",
            });
        }

        // Remove the row if all values are empty
        const allFieldsEmpty = Object.values(updatedRows[index]).every(
            (val) => val === ""
        );
        if (allFieldsEmpty) {
            updatedRows.splice(index, 1);
        }

        setData("rows", updatedRows);
    };
    const grandTotal = data.rows.reduce((acc, row) => {
        const total = Number(row.total) || 0; // Convert to a number, default to 0 if invalid
        return acc + total;
    }, 0);

    console.log(data);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg ">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-black">
                        {"Create Sales"}
                    </h2>
                    <button
                        onClick={() => {
                            onClose();
                            setData({
                                payed: "",
                                discount: "",
                                total: "",
                                gst: "",
                                rows: [
                                    {
                                        code: "",
                                        category: "",
                                        brand: "",
                                        model: "",
                                        quantity: "",
                                        rate: "",
                                        saleRate: "",
                                        gst: 0,
                                        discount: 0,
                                        productQuantity: "",
                                        productId: "",
                                        total: "",
                                    },
                                ],
                            });
                        }}
                        className="text-gray-600 hover:text-gray-800"
                    >
                        &times;
                    </button>
                </div>
                <form className="p-4 text-black">
                    <table className=" bg-white border border-gray-200 mb-4 mt-4 min-w-[600px]">
                        <thead>
                            <tr>
                                {[
                                    "CODE",
                                    "ITEM",
                                    "MODEL",
                                    "QUANTITY",
                                    "RATE",
                                    "GST/DISCOUNT",
                                    "TOTAL",
                                ].map((header, idx) => (
                                    <th
                                        key={idx}
                                        className="px-4 py-1 border-x bg-gray-100 border-b text-left text-sm font-medium text-gray-700"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {data.rows.map((row, index) => (
                                <tr key={index} className="border-b">
                                    {/* SLNO - row number */}
                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="string"
                                            value={row.code}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "code",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.code`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            placeholder="Code"
                                        />
                                    </td>
                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="text"
                                            id="category"
                                            name="category"
                                            value={
                                                row.category
                                                    ? row.category +
                                                      "-" +
                                                      row.brand
                                                    : ""
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 cursor-not-allowed py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.category`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            placeholder="Item"
                                            disabled
                                        />
                                    </td>

                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="text"
                                            value={row.model}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "model",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.model`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            placeholder="Model"
                                            disabled
                                        />
                                    </td>

                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="number"
                                            value={row.quantity}
                                            onChange={(e) => {
                                                handleInputChange(
                                                    index,
                                                    "quantity",
                                                    e.target.value
                                                );
                                            }}
                                            className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.quantity`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            placeholder="Quantity"
                                            min={1}
                                            max={row.productQuantity}
                                        />
                                    </td>
                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="number"
                                            value={parseFloat(row.rate)}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "rate",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.rate`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            disabled
                                            placeholder="Rate"
                                        />
                                    </td>
                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="text"
                                            value={
                                                row.gst +
                                                "%" +
                                                "-" +
                                                row.discount +
                                                "%"
                                            }
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "gst",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.gst`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            disabled
                                            placeholder="GST/Discount"
                                        />
                                    </td>
                                    <td className="px-2 py-2 border-x">
                                        <input
                                            type="number"
                                            value={parseFloat(row.total)}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "total",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                                errors[`rows.${index}.total`]
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-gray-300 focus:ring-blue-400"
                                            }`}
                                            disabled
                                            placeholder="total"
                                        />
                                    </td>
                                </tr>
                            ))}
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
                                {grandTotal - data.discount ?? 0}
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
                            <label
                                className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                                htmlFor="cash"
                            >
                                Payment
                            </label>
                            <input
                                type="number"
                                id="payed"
                                name="payed"
                                value={data.payed}
                                onChange={(e) =>
                                    setData("payed", e.target.value)
                                }
                                className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                    errors.payed
                                        ? "border-red-500 focus:ring-red-400"
                                        : "border-gray-300 focus:ring-blue-400"
                                }`}
                                placeholder="Enter Cash Payment "
                                min={0}
                            />
                            {errors.payed && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.cash}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={() => {
                                onClose();
                                setData({
                                    payed: "",
                                    discount: "",
                                    total: "",
                                    rows: [
                                        {
                                            code: "",
                                            category: "",
                                            brand: "",
                                            model: "",
                                            quantity: "",
                                            rate: "",
                                            saleRate: "",
                                            gst: 0,
                                            discount: 0,
                                            productQuantity: "",
                                            productId: "",
                                        },
                                    ],
                                });
                            }}
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
