import React, { useEffect, useState } from "react";

const ICONS = {
    success: (
        <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
    ),
    error: (
        <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
            ></path>
        </svg>
    ),
    warning: (
        <svg
            className="w-8 h-8"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 512"
        >
            <path
                fill="#ffffff"
                d="M96 64c0-17.7-14.3-32-32-32S32 46.3 32 64l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32L96 64zM64 480a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
            />
        </svg>
    ),
    info: (
        <svg
            className="w-8 h-8"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
        >
            <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224 32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0 0-192-32 0c-17.7 0-32-14.3-32-32z" />
        </svg>
    ),
};

const COLORS = {
    success: "from-green-400 to-teal-400",
    error: "from-red-500 to-pink-500",
    warning: "from-yellow-400 to-orange-500",
    info: "from-blue-400 to-indigo-500",
};

function Alert({
    type = "success",
    title,
    description,
    onClose,
    autoClose = true,
    delay = 4000,
}) {
    const [visible, setVisible] = useState(true);

    // Auto close alert after a set delay (default: 4 seconds)
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                handleClose();
            }, delay);
            return () => clearTimeout(timer); // Cleanup timer on component unmount
        }
    }, [autoClose, delay]);

    const handleClose = () => {
        setVisible(false);
        if (onClose) {
            setTimeout(() => {
                onClose();
            }, 300); // Wait for animation before calling onClose
        }
    };

    if (!visible) return null;

    return (
        <div
            className={` z-50 flex items-center bg-gradient-to-r ${COLORS[type]} text-white p-6 rounded-2xl shadow-2xl transform transition-all duration-300 ease-in-out max-w-lg w-full alert-slide-down fixed top-4 left-auto `}
            style={{
                transform: visible ? "translateY(0)" : "translateY(-100%)",
                opacity: visible ? 1 : 0,
            }}
        >
            {/* Icon */}
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex justify-center items-center mr-4 shadow-lg">
                {ICONS[type]}
            </div>

            {/* Alert Content */}
            <div className="flex-1">
                <h4 className="font-bold text-2xl">
                    {title || "Notification"}
                </h4>
                <p className="text-sm mt-1 opacity-90">
                    {description || "This is a notification alert."}
                </p>
            </div>

            {/* Close Button */}
            <button
                className="absolute top-3 right-3 text-white bg-red-500 bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition duration-200"
                onClick={handleClose}
            >
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
    );
}

export default Alert;
