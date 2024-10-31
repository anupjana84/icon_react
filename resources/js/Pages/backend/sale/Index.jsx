import React from "react";
import PageHeader from "../../../layout/components/pageHeader";
import { Link, useForm } from "@inertiajs/react";
import { formatDate } from "../../../helper/dateFormater";
import { ReceiptText } from "lucide-react";

export default function Index({ sales }) {
    const { get } = useForm();
    console.log(sales);
    const handlePageChange = (url) => {
        get(url);
    };
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Sales"
                    link="/sales/create"
                    linkName="Add Sales"
                />

                {sales.data.length > 0 && (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-center">
                                            Sl No.
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Customer
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Phone Number
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Total Payed
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Total Amount
                                        </th>
                                        <th className="py-3 px-6 text-center">
                                            Sale Date
                                        </th>

                                        <th className="py-3 px-6 text-center">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {sales.data.map((sales, index) => (
                                        <tr
                                            key={sales.id}
                                            className="border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                {index + 1}.
                                            </td>
                                            <td className="py-3 px-6 text-center whitespace-nowrap">
                                                {sales.customer.name}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {sales.customer.phone}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {parseFloat(
                                                    parseInt(
                                                        sales.sales_payment
                                                            .cash_payment
                                                    ) +
                                                        parseInt(
                                                            sales.sales_payment
                                                                .online_payment ||
                                                                0
                                                        )
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                ₹
                                                {parseFloat(
                                                    sales.sales_payment.amount
                                                )}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {formatDate(
                                                    new Date(sales.created_at)
                                                        .toISOString()
                                                        .split("T")[0]
                                                )}
                                            </td>

                                            <td className="py-3 px-6 flex gap-2 justify-center">
                                                <Link
                                                    href={`sales/${sales.id}`}
                                                    className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                                >
                                                    <ReceiptText color="white" />
                                                </Link>
                                                <Link
                                                    href={`sales/${sales.id}/invoice`}
                                                    className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                                >
                                                    <ReceiptText color="white" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-center items-center mt-4">
                            {sales.links.map((link, index) => (
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
                    </>
                )}

                {sales.data.length <= 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <p className="text-center text-gray-600">
                            No users found.
                        </p>
                    </div>
                )}
            </main>
        </>
    );
}
