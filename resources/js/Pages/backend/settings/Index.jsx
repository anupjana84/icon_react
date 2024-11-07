// src/pages/SettingsPage.jsx
import { Link, usePage } from "@inertiajs/react";
import React from "react";

// Define the array of tabs with links to their respective pages
const tabs = [
    { name: "Profile ", link: "/settings/profile" },
    { name: "Products Codes", link: "/settings/product" },
    { name: "Payment ", link: "/settings/payment" },
];

const SettingsPage = ({ children }) => {
    // Use Inertia's `usePage` to get the current URL
    const { url } = usePage();

    return (
        <div className="p-8 min-h-screen bg-black text-gray-200">
            <h1 className="text-3xl font-semibold text-white mb-6">Settings</h1>

            {/* Tabs Navigation */}
            <div className="flex space-x-4 border-b border-gray-700 pb-2 mb-6">
                {tabs.map((tab) => (
                    <Link
                        key={tab.name}
                        href={tab.link}
                        className={`px-4 py-2 font-medium transition duration-300 ${
                            url === tab.link
                                ? "text-white border-b-2 border-blue-500"
                                : "text-gray-400 hover:text-gray-300"
                        }`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>
            {/* Render the current page's content inside the component */}
            <div className=" p-6 rounded-lg shadow-lg">{children}</div>
        </div>
    );
};

export default SettingsPage;
