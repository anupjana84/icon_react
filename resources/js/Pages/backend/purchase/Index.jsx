import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { Menu, Trash2, Pencil, ReceiptText } from "lucide-react";
import { Link } from "@inertiajs/react";
import { formatDate } from "../../../helper/dateFormater";

function Index({ purchase }) {
    const tableRef = useRef(null);
    console.log(purchase);

    // useEffect(() => {
    //     if (purchase && Object.entries(purchase).length > 0) {
    //         const mappedKeys = Object.keys(purchase.data).map((key) => ({
    //             key: key,
    //             data: purchase.data[key],
    //         }));
    //         setPurchases(mappedKeys);
    //     }
    // }, [purchase]);
    // console.log(purcheses);

    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Purchase"
                    link="/purchase/create"
                    linkName="Add Purchase"
                />
                <div
                    className="overflow-x-auto hover:overflow-y-hidden  mx-4"
                    ref={tableRef}
                >
                    {purchase && purchase.data.length > 0 && (
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
                                        Invoice No.
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
                                {purchase.data.map((pur) => {
                                    const totalPurchaseAmount =
                                        pur.products.reduce((total, item) => {
                                            return (
                                                total +
                                                parseFloat(
                                                    item.purchase_price *
                                                        item.purchase_qty || 0
                                                )
                                            ); // Convert to a number
                                        }, 0);

                                    const date = formatDate(
                                        pur.purchase_receive_date
                                    ); // Ensure you have the formatDate function

                                    return (
                                        <tr
                                            key={pur.id}
                                            className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                                        >
                                            <td className="py-3 px-6 text-left">
                                                {pur.company.name}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {date}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {pur.purchase_invoice_no}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {totalPurchaseAmount.toFixed(0)}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {pur.gst === 1 ? "Yes" : "No"}
                                            </td>
                                            <td className="py-3 px-6 text-center flex justify-center items-center gap-2">
                                                <Link
                                                    href={`/purchases/${pur.id}`}
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

                    {purchase.length <= 0 && (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-center text-gray-100">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {purchase && purchase.data.length > 0 && (
                    <div className="flex justify-center items-center mt-4">
                        {purchase.links.map((link, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-1 border ${
                                    link.active
                                        ? "bg-indigo-500 text-white"
                                        : "bg-white text-indigo-500"
                                } rounded hover:bg-indigo-600 hover:text-white`}
                                onClick={() => handlePageChange(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}

export default Index;
