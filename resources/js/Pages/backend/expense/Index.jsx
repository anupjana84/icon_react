import React, { useState } from "react";
import PageHeader2 from "../../../layout/components/PageHeader2";
import { Link, useForm } from "@inertiajs/react";
import Alert from "../../../layout/components/AlertMessage";
import { Pencil, ReceiptText, Trash2 } from "lucide-react";
import { ExpenseModal } from "./Form";
import { formatDate } from "../../../helper/dateFormater";

export default function Index({ expenses }) {
    const [isOpen, setIsOpen] = useState(false);
    const [postId, setPostId] = useState(null);
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
    const handleAddNewItem = () => {
        setCurrentItem(null); // Clear current item to open the modal for creating a new item
        setIsModalOpen(true);
    };

    return (
        <main className="max-w-4xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader2
                title="Expenses"
                setOpen={handleAddNewItem}
                setMessage={setMessage}
                name="Add Expense"
            />
            {expenses.data && expenses.data.length > 0 && (
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Sl No.</th>
                            <th className="py-3 px-6 text-center">Date</th>
                            <th className="py-3 px-6 text-center">Amount</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {expenses.data.map((expense, index) => (
                            <tr key={index}>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {index + 1}.
                                </td>
                                <td className="py-3 px-6 text-center whitespace-nowrap">
                                    {formatDate(expense.expense_date)}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    ₹{parseInt(expense.total_amount)}
                                </td>

                                <td className="py-3 px-6 flex gap-2 justify-center">
                                    <Link
                                        href={`expenses/${expense.expense_date}`}
                                        className="bg-blue-500 w-14 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out flex items-center"
                                    >
                                        <ReceiptText color="white" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {expenses.data.length <= 0 && (
                <div className="flex justify-center items-center h-screen">
                    <p className="text-center text-gray-600">
                        No Expenses found.
                    </p>
                </div>
            )}

            {expenses.links && expenses.data && expenses.data.length > 0 && (
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex space-x-2">
                            {expenses.links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.url}
                                        className={`px-4 py-2 rounded-lg transition duration-300 ease-in-out transform ${
                                            link.active
                                                ? "bg-blue-600 text-white shadow-lg"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
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
                currentItem={currentItem}
                setMessage={setMessage}
            />
        </main>
    );
}
