import React, { useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = () => {
    useEffect(() => {
        // Load a barcode image for testing
        Quagga.decodeSingle(
            {
                src: "/Screenshot 2024-10-06 at 16.52.21.png",
                numOfWorkers: 0,
                inputStream: {
                    size: 800,
                },
                decoder: {
                    readers: ["code_128_reader"],
                },
            },
            (result) => {
                console.log(result);
                if (result && result.codeResult) {
                    console.log("Barcode detected: ", result.codeResult.code);
                } else {
                    console.log("Barcode not detected.");
                }
            },
            (err) => {
                console.error("QuaggaJS error: ", err);
            }
        );
    }, []);

    return <div>Barcode scanner simulation</div>;
};

export default BarcodeScanner;
