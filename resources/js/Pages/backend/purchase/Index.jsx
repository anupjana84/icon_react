import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { Menu, Trash2, Pencil, ReceiptText } from "lucide-react";
import { Link } from "@inertiajs/react";
import { formatDate } from "../../../helper/dateFormater";

function Index({ purchase }) {
    const [purcheses, setPurchases] = useState([]);
    const tableRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (tableRef.current) {
                tableRef.current.scrollLeft += e.deltaY; // Scroll horizontally
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

    useEffect(() => {
        if (purchase && Object.entries(purchase).length > 0) {
            const mappedKeys = Object.keys(purchase.data).map((key) => ({
                key: key,
                data: purchase.data[key],
            }));
            setPurchases(mappedKeys);
        }
    }, [purchase]);

    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Purchase"
                    link="/purchase/create"
                    linkName="Add Purchase"
                />
                <div
                    className="overflow-x-auto hover:overflow-y-hidden max-h-[400px] mx-4"
                    ref={tableRef}
                >
                    {purcheses && purcheses.length > 0 && (
                        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        Company Name
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Receive Date
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Products
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Total Purchase
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        GST
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {purcheses.map((purchase) => {
                                    const totalPurchaseAmount =
                                        purchase.data.reduce((total, item) => {
                                            return (
                                                total +
                                                parseFloat(
                                                    item.products
                                                        .purchase_price *
                                                        item.products
                                                            .quantity || 0
                                                )
                                            ); // Convert to a number
                                        }, 0);

                                    const date = formatDate(
                                        purchase.data[0].purchase_receive_date
                                    ); // Ensure you have the formatDate function

                                    return (
                                        <tr
                                            key={purchase.key}
                                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {purchase.data[0].company.name}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {date}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {purchase.data.map(
                                                    (item, index) => (
                                                        <span
                                                            key={
                                                                item.products.id
                                                            }
                                                            className="mr-auto"
                                                        >
                                                            {index + 1}.{" "}
                                                            {
                                                                item.products
                                                                    .category
                                                                    .name
                                                            }
                                                            <br />
                                                        </span>
                                                    )
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {totalPurchaseAmount.toFixed(0)}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {purchase.data[0].gst === 1
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                            <td className="py-3 px-6 text-center flex justify-center items-center gap-2">
                                                <Link
                                                    href={`/purchases/${purchase.data[0].company_id}/${purchase.data[0].purchase_receive_date}`}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 flex items-center transition duration-300 ease-in-out"
                                                >
                                                    <ReceiptText color="white" />
                                                </Link>
                                                {/* <Link className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out">
                                                    <Pencil color="white" />
                                                </Link>
                                                <button className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out">
                                                    <Trash2 color="white" />
                                                </button> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}

                    {purcheses.length <= 0 && (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-center text-gray-600">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center gap-3 mt-4">
                    {purchase.prev_page_url ? (
                        <Link
                            href={purchase.prev_page_url}
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center shadow-md"
                        >
                            <span className="mr-2">« Previous</span>
                        </Link>
                    ) : (
                        <button
                            className="bg-gray-300 text-gray-500 rounded-md px-4 py-2 cursor-not-allowed shadow-md"
                            disabled
                        >
                            <span className="mr-2">« Previous</span>
                            {/* Left Arrow for Previous */}
                        </button>
                    )}
                    <div className="flex items-center space-x-2">
                        {/* Optional: Add current page indicator */}
                        <span className="text-gray-600">
                            Page {purchase.current_page} of {purchase.last_page}
                        </span>
                    </div>
                    {purchase.next_page_url ? (
                        <Link
                            href={purchase.next_page_url}
                            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center shadow-md"
                        >
                            <span className="ml-2">Next »</span>{" "}
                            {/* Right Arrow for Next */}
                        </Link>
                    ) : (
                        <button
                            className="bg-gray-300 text-gray-500 rounded-md px-4 py-2 cursor-not-allowed shadow-md"
                            disabled
                        >
                            <span className="ml-2">Next »</span>{" "}
                            {/* Right Arrow for Next */}
                        </button>
                    )}
                </div>
            </main>
        </>
    );
}

export default Index;
