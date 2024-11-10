import React, { useEffect } from "react";
import SettingsPage from "../Index";
import { useForm } from "@inertiajs/react";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const dateOptions = [
    { label: "All", value: "all" },
    { label: "Today", value: "today" },
    { label: "Last 3 Days", value: "last_3_days" },
    { label: "Last 1 Week", value: "last_1_week" },
    { label: "Last 1 Month", value: "last_1_month" },
];
export default function ProductSettings({ products, dateRange }) {
    const { data, setData, get } = useForm({ date_range: dateRange });
    const invoiceRef = React.useRef(null);
    console.log(products);
    // Update the page when date range changes
    useEffect(() => {
        if (data.date_range !== dateRange) {
            get("/settings/product", { replace: true });
        }
    }, [data.date_range]);

    // Handle date range change
    const handleDateRangeChange = (event) => {
        setData("date_range", event.target.value);
    };
    const handleScreenshot = async () => {
        if (invoiceRef.current) {
            try {
                // Capture the screenshot of the element
                const canvas = await html2canvas(invoiceRef.current, {
                    scale: 2, // Improve screenshot resolution
                    backgroundColor: "#ffffff", // Ensure white background
                });

                // Create a PDF from the canvas
                const pdf = new jsPDF("p", "mm", "a4"); // Set the page size to A4
                const imgData = canvas.toDataURL("image/png");

                // Get the dimensions of the canvas
                const imgWidth = 210; // A4 width in mm
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                // Add the image to the PDF, and adjust the scale accordingly
                pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

                // Save the PDF as a file
                pdf.save("Product_Barcode.pdf");
            } catch (error) {
                console.error("Error capturing screenshot:", error);
            }
        }
    };

    const handlePageChange = (url) => {
        get(url);
    };

    return (
        <SettingsPage>
            <div className="p-8 min-h-screen text-gray-200 flex flex-col items-center">
                {/* Fixed Table with Borders and Scroll */}
                <div className="overflow-x-auto flex flex-col items-center  justify-center max-w-[1300px] mx-auto p-3">
                    <div className="mb-6 gap-3 flex w-full flex-row items-center justify-between ">
                        {/* Dynamic Title */}
                        <h3 className="text-xl font-semibold text-gray-100 w-25">
                            Products Barcode
                        </h3>

                        <div className="flex justify-between items-center mb-4">
                            <select
                                value={data.date_range}
                                onChange={handleDateRangeChange}
                                className="bg-gray-800 border border-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-gray-700"
                            >
                                {dateOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div
                        ref={invoiceRef}
                        className="w-[1000px] bg-white p-4 rounded-lg shadow-lg "
                    >
                        <div className="grid grid-cols-3 gap-1">
                            {products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex flex-col items-center justify-center  p-1 border border-gray-600"
                                    >
                                        <h4 className="text-black">
                                            {product.brand.name}-
                                            {product.category.name}
                                        </h4>
                                        <p className="text-black mb-2">
                                            {product.model}
                                        </p>

                                        <Barcode
                                            value={product.code}
                                            id={`barcode-${product.id}`}
                                            format="CODE128"
                                            width={1.3}
                                            height={40}
                                            displayValue={true}
                                            textColor="#FFFFFF"
                                            textPosition="bottom"
                                            font="Arial"
                                            fontSize="14"
                                            fontOptions="bold"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-4">
                                    No products found
                                </div>
                            )}
                        </div>
                    </div>
                    {products.data.length > 0 && (
                        <div className="flex justify-center items-center mt-4">
                            {products.links.map((link, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 mx-1 border ${
                                        link.active
                                            ? "bg-indigo-500 text-white"
                                            : "bg-white text-indigo-500"
                                    } rounded hover:bg-indigo-600 hover:text-white`}
                                    onClick={() => handlePageChange(link.url)}
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    {/* Print Button */}
                    {products.data.length > 0 && (
                        <button
                            onClick={handleScreenshot}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Print All
                        </button>
                    )}
                </div>
            </div>
        </SettingsPage>
    );
}
