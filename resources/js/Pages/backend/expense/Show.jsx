import React, { useState } from "react";
import PageHeader2 from "../../../layout/components/PageHeader2";
import { Link, useForm } from "@inertiajs/react";
import Alert from "../../../layout/components/AlertMessage";
import { Pencil, ReceiptText, Trash2 } from "lucide-react";
import { ExpenseModal } from "./Form";
import { formatDate } from "../../../helper/dateFormater";
import PageHeader from "../../../layout/components/pageHeader";
import { div } from "framer-motion/client";

export default function Show({ expenses }) {
    // console.log(isOpen, postId);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    // console.log(message);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { delete: destroy, processing } = useForm();
    const handleEditItem = (expense) => {
        console.log(expense);
        setCurrentItem(expense); // Set the item to be edited
        setIsModalOpen(true);
    };

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader
                title="Expenses » Details"
                link="/expenses"
                linkName="Back"
            />
            {expenses && expenses.length > 0 && (
                <div className="overflow-x-scroll">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-center">
                                    Sl No.
                                </th>
                                <th className="py-3 px-6 text-center">Date</th>
                                <th className="py-3 px-6 text-center">
                                    category
                                </th>
                                <th className="py-3 px-6 text-center">
                                    Amount
                                </th>
                                <th className="py-3 px-6 text-center">
                                    Payment Method
                                </th>
                                <th className="py-3 px-6 text-center">Note</th>
                                <th className="py-3 px-6 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        {index + 1}.
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        {formatDate(expense.expense_date)}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {expense.category}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        ₹{parseInt(expense.amount)}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {expense.payment_method || "N/A"}
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        {expense.note || "N/A"}
                                    </td>

                                    <td className="py-3 px-6 flex gap-2 justify-center">
                                        <button
                                            onClick={() => {
                                                handleEditItem(expense);
                                                setMessage({
                                                    visible: false,
                                                    description: "",
                                                    type: "",
                                                    title: "",
                                                });
                                            }}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                        >
                                            <Pencil color="white" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {expenses.length <= 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-gray-600">
                        No Expenses found.
                    </p>
                </div>
            )}

            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                expense={currentItem}
                setMessage={setMessage}
            />
        </main>
    );
}
