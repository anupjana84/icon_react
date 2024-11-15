import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../helper/dateFormater";
import PageHeader from "../../../layout/components/pageHeader";
import { Pencil } from "lucide-react";
import Alert from "../../../layout/components/AlertMessage";
import { PurchaseModal } from "./components/PurchaseModel";
import { ProductModal } from "./components/ProductModel";

const PurchaseDetails = ({ purchases }) => {
    console.log(purchases);
    const tableRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [currentItem2, setCurrentItem2] = useState(null);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });

    const handleEditItem = () => {
        setIsModalOpen(true);
    };
    const handleEditItem2 = (data) => {
        setIsModalOpen2(true);
        setCurrentItem2(data);
    };

    return (
        <main className=" mx-auto py-1 px-1 lg:px-1">
            <PageHeader
                title="Purchase » Details"
                link="/purchase"
                linkName="Back"
            />
            {/* Upper Section for Company and Purchase Details */}
            <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-8">
                <div className="w-full flex justify-between gap-2 ">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                        Purchased Items
                    </h2>
                    <button
                        onClick={() => {
                            handleEditItem(purchases);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Company Name:
                        </span>
                        <span className="text-black ml-2">
                            {purchases.company.name}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            GST Number:
                        </span>
                        <span className="text-black ml-2">
                            {purchases.company.gst_number}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Purchase Date:
                        </span>
                        <span className="text-black ml-2">
                            {formatDate(purchases.purchase_date)}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Receive Date:
                        </span>
                        <span className="text-black ml-2">
                            {formatDate(purchases.purchase_receive_date)}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Invoice No:
                        </span>
                        <span className="text-black ml-2">
                            {purchases.purchase_invoice_no}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">GST:</span>
                        <span className="text-black ml-2">
                            {purchases.gst ? "Yes" : "No"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Section for Purchased Items */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-black">
                    Items List
                </h2>
                <div
                    className="overflow-x-auto  hover:overflow-y-hidden"
                    ref={tableRef}
                >
                    <table className="min-w-full table-auto ">
                        <thead>
                            <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Sl No.
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Item
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Brand
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Model
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    HSN Code
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    GST
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Purchase Quantity
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Rate
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Discount
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Sale Rate
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Point
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Free Delivery
                                </th>
                                <th className="px-6 py-3 border-b border-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.products.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-indigo-100 transition-colors duration-200 ${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.category.name}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.brand.name}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.model}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.category.hsn_code}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.category.gst}%
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.purchase_qty}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹{parseFloat(item.purchase_price)}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹{parseFloat(item.discount)}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹{parseFloat(item.sale_price)}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹
                                        {parseFloat(item.sale_price) +
                                            (parseFloat(item.sale_price) *
                                                parseFloat(item.category.gst)) /
                                                100}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.point}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.free_delivery}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        <button
                                            onClick={() => {
                                                handleEditItem2(item);
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <PurchaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                purchase={purchases}
                setMessage={setMessage}
            />

            <ProductModal
                isOpen={isModalOpen2}
                onClose={() => setIsModalOpen2(false)}
                product={currentItem2}
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
};

export default PurchaseDetails;
