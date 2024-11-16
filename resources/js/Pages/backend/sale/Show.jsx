import React, { useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { ProductEdit } from "./components/productEdit";
import { Pencil } from "lucide-react";
import Alert from "../../../layout/components/AlertMessage";

export default function Show({ sale }) {
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    // console.log(message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // console.log(sale);
    const calculateTotal = (price, gst, discount, quantity) => {
        // console.log(price, gst, discount, quantity);
        const gstAmount = (price * gst) / 100;
        const discountAmount = (price * discount) / 100;
        // console.log(gstAmount, discountAmount);
        const total = (parseInt(price) + gstAmount - discountAmount) * quantity;
        return parseInt(total);
    };
    const grandTotal = sale.sales_items.reduce(
        (acc, item) =>
            acc +
            parseFloat(
                calculateTotal(
                    item.price,
                    item.product.category.gst,
                    item.product.details
                        ? parseInt(item.product.details.discount)
                        : 0,
                    item.quantity
                )
            ),
        0
    );
    const handleEditItem = () => {
        setIsModalOpen(true);
    };
    return (
        <main className=" max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader title="Sales » Details" link="/sales" linkName="Back" />

            <div className="max-w-5xl mx-auto space-y-10">
                {/* Customer Details Section */}
                {sale.customer && (
                    <section className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-3xl font-bold text-green-600 mb-8 text-center">
                            Customer Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center">
                                <div>
                                    <label className="block text-gray-600">
                                        Name
                                    </label>
                                    <p className="text-lg text-gray-800 font-medium">
                                        {sale.customer.name}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <label className="block text-gray-600">
                                        Phone
                                    </label>
                                    <p className="text-lg text-gray-800 font-medium">
                                        {sale.customer.phone}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <label className="block text-gray-600">
                                        WhatsApp
                                    </label>
                                    <p className="text-lg text-gray-800 font-medium">
                                        {sale.customer.wpnumber ?? "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <label className="block text-gray-600">
                                        Address
                                    </label>
                                    <p className="text-lg text-gray-800 font-medium">
                                        {sale.customer.address ?? "N/A"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div>
                                    <label className="block text-gray-600">
                                        Pin Code
                                    </label>
                                    <p className="text-lg text-gray-800 font-medium">
                                        {sale.customer.pin}
                                    </p>
                                </div>
                            </div>
                            {sale.gat_number && (
                                <div className="flex items-center">
                                    <div>
                                        <label className="block text-gray-600">
                                            GST Number
                                        </label>
                                        <p className="text-lg text-gray-800 font-medium">
                                            {sale.gat_number}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Product Details Section */}
                <section className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="w-full flex justify-between gap-2 ">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            Product Details
                        </h2>
                        <button
                            onClick={() => {
                                handleEditItem();
                                setMessage({
                                    visible: false,
                                    description: "",
                                    type: "",
                                    title: "",
                                });
                            }}
                            className="bg-green-500 text-white px-2 h-[40px] py-1 rounded hover:bg-green-600 transition"
                        >
                            <Pencil color="white" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Product Name
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Warranty
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Price (₹)
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        GST (%)
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Discount (%)
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Quantity
                                    </th>
                                    <th className="p-4 border-b-2 text-gray-600 font-medium text-center">
                                        Total (₹)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sale.sales_items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="bg-white border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.product.brand.name} -{" "}
                                            {item.product.category.name}
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.warranty}
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            ₹
                                            {parseInt(
                                                item.price
                                            ).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.product.category.gst}%
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.discount
                                                ? parseInt(item.discount)
                                                : 0}
                                            %
                                        </td>
                                        <td className="p-4 text-gray-800 text-center">
                                            {item.quantity}
                                        </td>
                                        <td className="p-4 text-gray-800 font-semibold text-center">
                                            ₹
                                            {calculateTotal(
                                                item.price,
                                                item.product.category.gst,
                                                item.discount
                                                    ? parseInt(item.discount)
                                                    : 0,
                                                item.quantity
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {/* Grand Total Row */}
                                <tr className="bg-gray-100 w-full">
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
                                        ₹{parseInt(grandTotal).toLocaleString()}
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
                                        {parseInt(
                                            grandTotal -
                                                parseInt(sale.discount ?? 0)
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Payment Section */}
                <section className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                        Payment Details
                    </h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                            <span className="text-lg font-semibold text-blue-900 flex items-center">
                                Total Amount
                            </span>
                            <span className="text-lg font-semibold text-gray-700">
                                ₹
                                {parseFloat(
                                    sale.sales_payment.amount
                                ).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                            <span className="text-lg font-semibold text-blue-900 flex items-center">
                                Cash Payment
                            </span>
                            <span className="text-lg font-semibold text-gray-700">
                                ₹
                                {parseFloat(
                                    sale.sales_payment.cash_payment
                                ).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                            <span className="text-lg font-semibold text-blue-900 flex items-center">
                                Online Payment
                            </span>
                            <span className="text-lg font-semibold text-gray-700">
                                ₹
                                {parseFloat(
                                    sale.sales_payment.online_payment ?? 0
                                ).toLocaleString()}
                            </span>
                        </div>

                        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                            <span className="text-lg font-semibold text-blue-900 flex items-center">
                                Finance
                            </span>
                            <span className="text-lg font-semibold text-gray-700">
                                {sale.sales_payment.finance ?? "N/A"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-blue-900 flex items-center">
                                Date
                            </span>
                            <span className="text-lg font-semibold text-gray-700">
                                {new Date(
                                    sale.sales_payment.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <ProductEdit
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sale={sale}
                setMessage={setMessage}
            />

            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}
        </main>
    );
}
