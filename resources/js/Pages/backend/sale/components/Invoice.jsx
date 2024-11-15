// src/Invoice.js
import React, { useRef } from "react";
import computerImage from "../../../assets/imges/computer.png";
import { toWords } from "number-to-words";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = ({ seller, buyer, items, discount, gstNumber, id }) => {
    console.log(items);
    const invoiceRef = useRef();
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
                pdf.save("invoice.pdf");
            } catch (error) {
                console.error("Error capturing screenshot:", error);
            }
        }
    };
    const handlePrint = () => {
        const printContent = invoiceRef.current;
        const originalContents = document.body.innerHTML;

        // Replace body content with invoice content for printing
        document.body.innerHTML = printContent.innerHTML;
        window.print();

        // Restore the original content
        document.body.innerHTML = originalContents;
        window.location.reload(); // To reload any JavaScript
    };
    const calculateTotal = (price, gst, discount, quantity) => {
        // console.log(price, gst, discount, quantity);
        const gstAmount = (price * gst) / 100;
        const discountAmount = (price * discount) / 100;
        // console.log(gstAmount, discountAmount);
        const total = (parseInt(price) + gstAmount - discountAmount) * quantity;
        return total;
    };
    const grandTotal = items.reduce(
        (acc, item) =>
            acc +
            parseFloat(
                calculateTotal(
                    item.price,
                    item.product.category.gst,
                    item.product.details
                        ? parseInt(item.product.details.discount)
                        : 0,
                    item.quantity
                )
            ),
        0
    );

    const totalAfterDiscount = grandTotal - discount;
    const renderWarranty = (item) => {
        switch (item.warranty) {
            case "0m":
                return <p>No Warranty</p>;
            case "1m":
                return <p>1 Months Warranty</p>;
            case "2m":
                return <p>2 Months Warranty</p>;
            case "3m":
                return <p>3 Months Warranty</p>;
            case "4m":
                return <p>4 Months Warranty</p>;
            case "5m":
                return <p>5 Months Warranty</p>;
            case "6m":
                return <p>6 Months Warranty</p>;
            case "7m":
                return <p>7 Months Warranty</p>;
            case "8m":
                return <p>8 Months Warranty</p>;
            case "9m":
                return <p>9 Months Warranty</p>;
            case "10m":
                return <p>10 Months Warranty</p>;
            case "11m":
                return <p>11 Months Warranty</p>;

            case "1y":
                return <p>1 Year Warranty</p>;
            case "2y":
                return <p>2 Years Warranty</p>;
            default:
                return <p>Warranty: {item.warranty}</p>;
        }
    };
    return (
        <div className="relative max-w-2xl mx-auto  bg-white rounded-xl shadow-lg  w-[800px]">
            <div ref={invoiceRef} className="w-full h-full p-4  z-20">
                <div>
                    <p className="flex justify-between">
                        <span className="text-gray-700  ">
                            Invoice No: {id} <br />
                            Fer. No:
                        </span>
                        <span className="text-gray-700 ml-2">
                            Date:{" "}
                            {new Date(items[0].created_at).toLocaleDateString()}
                        </span>
                    </p>
                </div>

                <div className="mb-3 flex justify-center ">
                    <div className="flex justify-center flex-col items-center">
                        <p className="text-gray-700 text-xl font-semibold ">
                            {seller.name}
                        </p>
                        <p className="text-gray-700">{seller.address}</p>
                        <p className="text-gray-700">Phone: {seller.phone}</p>
                        <p className="text-gray-700">
                            Servise: {seller.servise}
                        </p>
                        <p className="text-gray-700">State: {seller.state}</p>
                        <p className="text-gray-700">Email: {seller.email}</p>
                    </div>
                </div>

                {buyer && (
                    <div className="mb-2 flex justify-center flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-700 ">
                            Bill To:
                        </h3>
                        <p className="text-gray-700">Name: {buyer.name}</p>
                        <p className="text-gray-700">
                            Address: {buyer.address}, pin-{buyer.pin}
                        </p>
                        <p className="text-gray-700">Phone: {buyer.phone}</p>
                        {gstNumber && (
                            <p className="text-gray-700">
                                GST Number: {gstNumber}
                            </p>
                        )}
                    </div>
                )}

                <table className="min-w-full border border-gray-300">
                    <thead className="text-gray-700">
                        <tr>
                            <th className="p-2 border-b text-center  ">
                                Product
                            </th>
                            <th className="p-2 border-b text-center ">
                                HSN/SAC
                            </th>
                            <th className="p-2 border-b text-center ">price</th>
                            <th className="p-2 border-b text-center ">Qty</th>
                            <th className="p-2 border-b   text-center">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2 text-gray-700 ">
                                    {item.product.brand.name}-
                                    {item.product.category.name}
                                    <br />
                                    {item.product.code}
                                    <br />
                                    {item.sl_no}
                                    <br />
                                    {renderWarranty(item)}
                                </td>
                                <td className="p-2 text-gray-700 text-center ">
                                    {item.product.category.hsn_code}
                                </td>

                                {/* <td className="p-4 text-gray-700 text-center">
                                    {parseInt(
                                        item.product.details
                                            ? item.product.details.discount
                                            : 0
                                    )}
                                    %
                                </td> */}
                                <td className="p-2 text-gray-700 text-center">
                                    price: ₹
                                    {parseInt(item.price).toLocaleString()}{" "}
                                    <br />
                                    GST:{" "}
                                    {parseInt(
                                        item.product.category.gst
                                    ).toLocaleString()}
                                    %
                                    <br />
                                    Discount:{" "}
                                    {parseInt(
                                        item.product.details
                                            ? item.product.details.discount
                                            : 0
                                    )}
                                    %
                                </td>
                                <td className="p-2 text-gray-700 text-center">
                                    {item.quantity} pcs
                                </td>
                                <td className="p-2 text-gray-700">
                                    ₹
                                    {parseInt(
                                        calculateTotal(
                                            item.price,
                                            item.product.category.gst,
                                            item.product.details
                                                ? parseInt(
                                                      item.product.details
                                                          .discount
                                                  )
                                                : 0,
                                            item.quantity
                                        )
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="border-t pt-1 border-b mb-1">
                    <div className="flex justify-between font-semibold text-gray-700">
                        <span>Subtotal</span>
                        <span>₹{parseInt(grandTotal).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold  text-gray-700">
                        <span>Discount</span>
                        <span>-₹{parseInt(discount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-gray-700">
                        <span>Total</span>
                        <span>
                            ₹{parseInt(totalAfterDiscount).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="flex text-lg font-bold justify-between text-gray-700 wifull mb-2">
                    {toWords(parseInt(totalAfterDiscount)) + " " + "rupees"}
                </div>

                <div className="w-full flex justify-end">
                    <div className="w-[30%] text-gray-700 flex justify-center items-center pt-10 ">
                        <p className="border-t"> Authorised Signetory</p>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-25 flex justify-center items-center">
                <button
                    onClick={handleScreenshot}
                    className="text-white text-sm font-semibold px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700"
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default Invoice;
