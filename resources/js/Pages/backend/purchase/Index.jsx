import React, { useEffect, useState } from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { Menu, Trash2, Pencil, ReceiptText } from "lucide-react";
import { Link } from "@inertiajs/react";

function index({ purchase }) {
    const [purcheses, setPurchases] = useState([]);
    // console.log(purchase);

    useEffect(() => {
        if (purchase && Object.entries(purchase).length > 0) {
            const mappedKeys = Object.keys(purchase).map((key) => ({
                key: key,
                data: purchase[key],
            }));
            setPurchases(mappedKeys);
        }
    }, [purchase]);
    console.log(purcheses);
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Purchase"
                    link="/purchase/create"
                    linkName="Add Purchase"
                />
                <div className="overflow-x-auto">
                    {purchase && Object.entries(purchase).length > 0 && (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">
                                        Image
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Code
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Quantity
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Sale Price
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Status
                                    </th>
                                    <th className="py-3 px-6 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {Object.entries(purchase).map(
                                    (key, purchase) => (
                                        <tr
                                            key={key}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-center">
                                                {/* {product.quantity} */}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {/* ₹
                                            {Number(product.sale_price).toFixed(
                                                2
                                            )} */}
                                            </td>
                                            <td className="py-3 px-6 text-center ">
                                                {/* <span
                                                className={`inline-block px-2 py-1 text-xs font-bold rounded-full
                                        ${
                                            product.status === "active"
                                                ? "bg-green-200 text-green-600"
                                                : "bg-red-200 text-red-600"
                                        }`}
                                            >
                                                {product.status}
                                            </span> */}
                                            </td>
                                            <td className="py-3 px-6 flex justify-center items-center gap-2 mt-4">
                                                <Link
                                                    // href={`/products/${product.id}`}
                                                    className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                                >
                                                    <ReceiptText color="white" />
                                                </Link>

                                                <Link
                                                    // href={`/products/${product.id}/edit`}
                                                    className="bg-green-500 text-white rounded px-4 py-2 mr-2"
                                                >
                                                    <Pencil color="white" />
                                                </Link>
                                                <button
                                                    // onClick={() =>
                                                    //     openModal(product.id)
                                                    // }
                                                    className="bg-red-500 text-white rounded px-4 py-2"
                                                >
                                                    <Trash2 color="white" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    )}
                    {purchase.length <= 0 && (
                        <div className="flex justify-center items-center h-screen">
                            <p className="text-center text-gray-600">
                                No products found.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default index;
