import React, { useState } from "react";
import JsBarcode from "jsbarcode";
import { Copy, Printer } from "lucide-react";

const BarcodeComponent = ({
    code,
    width = 1,
    height = 30,
    display = true,
    product,
}) => {
    // console.log(product);
    const [isHovered, setIsHovered] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const canvasRef = React.createRef();

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    // Create the barcode when the component mounts
    React.useEffect(() => {
        if (canvasRef.current) {
            JsBarcode(canvasRef.current, code, {
                format: "CODE128",
                width: width,
                height: height,
                displayValue: display,
                fontSize: 17,
            });
        }
    }, [code, width, height, display]);

    return (
        <div
            className="relative flex justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas ref={canvasRef}></canvas>
            {isHovered && (
                <button
                    onClick={handleCopy}
                    className="absolute top-[25%] right-[45%] bg-gray-800 text-white rounded px-2 py-1 z-10"
                >
                    <Copy size={20} />
                </button>
            )}
            {showTooltip && (
                <div className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded">
                    Copied!
                </div>
            )}
        </div>
    );
};

export default BarcodeComponent;
