import React, { useState } from "react";
import Header from "../../../layout/header";
import { Menu, Trash2, Pencil } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";

const Index = ({ brands }) => {
    const {delete:destroy}=useForm()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [postId, setPostId]=useState(0)

    const openModal = (item) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    const handleDelete = () => {
        // Perform delete action here
        console.log("Item deleted:", currentItem);
        destroy(`/brands/${postId}`)
        setPostId(0)
        closeModal();
    };

    return (
        <>
            <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
                <Header title={"Product Home"} />

                <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                    <div className="flex-1 overflow-auto relative z-10">
                        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <h3 className=""></h3>
                            <Link
                                href="/products/create"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Product
                            </Link>
                        </div>
                    </div>

                    {/* <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div className="max-w-full overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead className="rounded-sm border border-stroke">
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="py-1 px-4 font-medium text-black xl:pl-11">
                                            Sl No.
                                        </th>
                                        <th className="py-1 px-4 font-medium text-black xl:pl-11">
                                            Name
                                        </th>
                                        <th className="py-1 px-4 font-medium text-black">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {brands.data.map((packageItem, key) => (
                                        <tr key={key}>
                                            <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black">
                                                    {key + 1}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-1 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black">
                                                    {packageItem.name}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-1 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openModal();
                                                            setPostId(packageItem.id)
                                                        }}
                                                        className="hover:text-primary rounded-lg p-3 bg-red-700"
                                                    >
                                                        <Trash2 color="white" />
                                                    </button>
                                                    <button
                                                        className="hover:text-primary rounded-lg p-3 bg-slate-500"
                                                    >
                                                        <Pencil color="white" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div> */}

                    {/* <div className="flex items-center justify-center space-x-2 mt-4">
                        {brands.links.map((item, i) =>
                            item.url ? (
                                <Link
                                    key={item.label}
                                    href={item.url}
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                    className={`px-4 py-2 rounded hover:bg-blue-600 ${
                                        item.active ? "bg-blue-500 text-white" : ""
                                    }`}
                                />
                            ) : (
                                <span
                                    key={item.label}
                                    dangerouslySetInnerHTML={{
                                        __html: item.label,
                                    }}
                                    className={`px-4 py-2 text-slate-500`}
                                ></span>
                            )
                        )}
                    </div> */}
                </main>
            </div>
            {/* {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg text-black font-bold mb-4">Are you sure?</h2>
                        <p className="mb-4 text-black">
                            Do you really want to delete this item? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    );
};

export default Index;
