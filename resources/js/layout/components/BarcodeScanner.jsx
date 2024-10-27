import React, { useState, useRef } from "react";

const BarcodeScanner = () => {
    const [barcode, setBarcode] = useState("");
    const inputRef = useRef(null);
    let timer;

    const handleBarcodeInput = (event) => {
        clearTimeout(timer);
        const value = event.target.value;

        // Wait briefly to ensure the full barcode input is received
        timer = setTimeout(() => {
            setBarcode(value); // Set the barcode
            inputRef.current.value = ""; // Clear the input for the next scan
        }, 300);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-5">Scan Barcode</h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="Scan barcode here..."
                onInput={handleBarcodeInput}
                autoFocus
                className="text-lg border border-gray-400 rounded-md px-4 py-2 w-80"
            />
            <p className="mt-5 text-lg font-semibold">
                Scanned Barcode: {barcode || "No barcode scanned yet"}
            </p>
        </div>
    );
};

export default BarcodeScanner;
