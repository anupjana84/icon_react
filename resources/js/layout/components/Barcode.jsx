import React, { useState } from "react";
import JsBarcode from "jsbarcode";
import { Printer } from "lucide-react";

const BarcodeComponent = ({
    code,
    width = 1,
    height = 30,
    display = true,
    product,
}) => {
    // console.log(product);
    const [isHovered, setIsHovered] = useState(false);
    const canvasRef = React.createRef();

    const handlePrint = () => {
        const canvas = canvasRef.current;
        const printWindow = window.open("", "_blank", "width=1000,height=600");
        const dataURL = canvas.toDataURL(); // Get the image data URL

        printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
            <title>Print Barcode</title>
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                    height: 100vh;
                    margin: 0;
                    background-color: #f4f4f4;
                }
        
                .card {
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    max-width: 400px;
                    text-align: center;
                }
        
                .card h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
        
                .card p {
                    margin: 5px 0;
                    color: #555;
                }
        
                .card img {
                    margin-top: 15px;
                    max-width: 100%;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>${product.name}</h1>
                <p>Model: ${product.model}</p>
                <p>Brand: ${product.brand.name}</p>
                <img src="${dataURL}" alt="Product Barcode" />
            </div>
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
