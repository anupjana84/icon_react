import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import Alert from "./AlertMessage";
// Make sure you're using the correct router

function PageHeader2({ title, setOpen, name, setMessage }) {
    return (
        <div className="flex-1 overflow-auto relative z-10 p-4">
            {/* Header Section */}
            <div className="mb-6 gap-3 flex flex-row items-center justify-between">
                {/* Dynamic Title */}
                <h3 className="text-xl font-semibold text-gray-100 w-25">
                    {title}
                </h3>
                {/* {isVisible ? (
                    <Alert
                        type="warning" // You can change this to "error", "warning", or "info"
                        title="🎉 Success!"
                        description="Your application has been received and will be reviewed within 48 hours."
                        onClose={handleClose}
                    />
                ) : (
                    <button
                        className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
                        onClick={handleShow}
                    >
                        Show Alert
                    </button>
                )} */}
                {/* Dynamic Button */}
                <button
                    onClick={() => {
                        setOpen(); // Adjust this path based on your routing
                        setMessage({
                            visible: false,
                            title: "",
                            description: "",
                            type: "",
                        });
                    }}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    {name}
                </button>
            </div>
        </div>
    );
}

export default PageHeader2;
