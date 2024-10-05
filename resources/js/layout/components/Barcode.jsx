import React, { useState } from "react";
import JsBarcode from "jsbarcode";
import { Printer } from "lucide-react";

const BarcodeComponent = ({ code, width = 1, height = 30, display = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const canvasRef = React.createRef();

    const handlePrint = () => {
        const canvas = canvasRef.current;
        const printWindow = window.open("", "_blank", "width=600,height=400");
        const dataURL = canvas.toDataURL(); // Get the image data URL

        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Barcode</title>
                    <style>
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    <img src="${dataURL}" style="max-width: 100%;" />
                </body>
            </html>
        `);

        printWindow.document.close(); // Close the document to finish loading
        printWindow.onload = () => {
            printWindow.print(); // Trigger the print dialog
            printWindow.close(); // Close the print window after printing
        };
    };

    // Create the barcode when the component mounts
    React.useEffect(() => {
        if (canvasRef.current) {
            JsBarcode(canvasRef.current, code, {
                format: "CODE128",
                width: width,
                height: height,
                displayValue: display,
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
                    onClick={handlePrint}
                    className="absolute top-[25%] right-[45%] bg-gray-800 text-white rounded px-2 py-1 z-10"
                >
                    <Printer size={20} />
                </button>
            )}
        </div>
    );
};

export default BarcodeComponent;
