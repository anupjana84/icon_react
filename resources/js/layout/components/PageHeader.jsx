import { Link } from "@inertiajs/react";
import React from "react";
// Make sure you're using the correct router

function PageHeader({ title, link, linkName }) {
    console.log(link, linkName);
    return (
        <div className="flex-1 overflow-auto relative z-10 p-4">
            {/* Header Section */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Dynamic Title */}
                <h3 className="text-xl font-semibold text-gray-100">{title}</h3>

                {/* Dynamic Button */}
                <Link
                    href={link} // Adjust this path based on your routing
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {linkName}
                </Link>
            </div>
        </div>
    );
}

export default PageHeader;
