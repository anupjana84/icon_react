import React from "react";
import Spline from "@splinetool/react-spline";

export default function LoginLayout({ children }) {
    return (
        <div className="relative w-full h-screen bg-[#080808] overflow-hidden">
            {/* Background Spline Model */}
            <div className="absolute inset-0 ml-[105px]">
                <Spline scene="https://prod.spline.design/EBC9mAFQBxTLfanA/scene.splinecode" />
            </div>

            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {children}
        </div>
    );
}
