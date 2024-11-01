import React, { useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import Spline from "@splinetool/react-spline";
import LoginLayout from "./layouts/LoginLayout";
import { Eye, EyeOff } from "lucide-react";
import { color } from "framer-motion";
import Alert from "../../layout/components/AlertMessage";

const LoginPage = () => {
    const { data, setData, post, processing, errors } = useForm({
        phone: "",
        password: "",
    });

    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);
        post("/login");
    };

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative flex items-center justify-center h-full">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8 w-80 shadow-md shadow-[#99f6e4]">
                <h2 className="text-white text-2xl font-semibold mb-4 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            className="block text-white text-sm mb-2"
                            htmlFor="phone"
                        >
                            Phone Number
                        </label>
                        <input
                            onChange={(e) => setData("phone", e.target.value)}
                            className={`w-full p-2 text-white bg-transparent border rounded focus:outline-none focus:ring-2 ${
                                errors.phone
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-indigo-500"
                            }`}
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-white text-sm mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className={`w-full p-2 text-white bg-transparent border rounded focus:outline-none focus:ring-2 ${
                                    errors.password
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-indigo-500"
                                }`}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <Eye
                                        size={20}
                                        style={{
                                            color: "white",
                                        }}
                                    />
                                ) : (
                                    <EyeOff
                                        size={20}
                                        style={{
                                            color: "white",
                                        }}
                                    />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}
        </div>
    );
};
LoginPage.layout = (page) => <LoginLayout children={page} />;
export default LoginPage;
