import React, { useEffect, useRef } from "react";
import { formatDate } from "../../../helper/dateFormater";
import PageHeader from "../../../layout/components/pageHeader";

const PurchaseDetails = ({ purchases }) => {
    // console.log(purchases);
    const tableRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            // Prevent the default vertical scroll
            e.preventDefault();
            // Scroll horizontally
            if (tableRef.current) {
                tableRef.current.scrollLeft += e.deltaY;
            }
        };

        const tableElement = tableRef.current;

        // Add wheel event listener
        tableElement.addEventListener("wheel", handleWheel, { passive: false });

        // Clean up the event listener on component unmount
        return () => {
            tableElement.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader
                title="Purchase » Details"
                link="/purchase"
                linkName="Back"
            />
            {/* Upper Section for Company and Purchase Details */}
            <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                    Purchase Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Company Name:
                        </span>
                        <span className="text-black ml-2">
                            {purchases[0].company.name}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            GST Number:
                        </span>
                        <span className="text-black ml-2">
                            {purchases[0].company.gst_number}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Purchase Date:
                        </span>
                        <span className="text-black ml-2">
                            {formatDate(purchases[0].purchase_date)}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Receive Date:
                        </span>
                        <span className="text-black ml-2">
                            {formatDate(purchases[0].purchase_receive_date)}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">
                            Invoice No:
                        </span>
                        <span className="text-black ml-2">
                            {purchases[0].purchase_invoice_no}
                        </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                        <span className="font-medium text-gray-600">GST:</span>
                        <span className="text-black ml-2">
                            {purchases[0].gst ? "Yes" : "No"}
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
                    className="overflow-x-auto max-h-[400px] hover:overflow-y-hidden"
                    ref={tableRef}
                >
                    <table className="min-w-full table-auto ">
                        <thead>
                            <tr className="bg-gray-200 text-black uppercase text-sm leading-normal">
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
                            </tr>
                        </thead>
                        <tbody>
                            {purchases.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-indigo-100 transition-colors duration-200 ${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.category.name}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.brand.name}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.model}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.category.hsn_code}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.category.gst}%
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.purchase_qty}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹
                                        {parseFloat(
                                            item.products.purchase_price
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹{parseFloat(item.products.discount)}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹{parseFloat(item.products.sale_price)}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        ₹
                                        {parseFloat(item.products.sale_price) +
                                            (parseFloat(
                                                item.products.sale_price
                                            ) *
                                                parseFloat(
                                                    item.products.category.gst
                                                )) /
                                                100}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.point}
                                    </td>
                                    <td className="px-6 py-4 border-b text-center border-gray-300 text-black">
                                        {item.products.free_delivery}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default PurchaseDetails;
