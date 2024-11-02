// src/Invoice.js
import React, { useRef } from "react";
import computerImage from "../../../assets/imges/computer.png";
import { toWords } from "number-to-words";

const Invoice = ({ seller, buyer, items, discount, gstNumber, id }) => {
    console.log(items);
    const invoiceRef = useRef();

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
        <div
            ref={invoiceRef}
            className="relative max-w-2xl mx-auto  bg-white rounded-xl shadow-lg border border-gray-300 w-[800px]"
        >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center pb-20 justify-center pointer-events-none z-0">
                <h1
                    className="text-8xl text-pink-100 font-caveat font-bold opacity-40"
                    style={{ transform: "rotate(-25deg)" }}
                >
                    Icon Computer
                </h1>
            </div>
            <div className="w-full h-full p-8  z-20">
                <div>
                    <p className="flex justify-between">
                        <span className="text-gray-700  ">
                            Invoice No: {id}
                        </span>
                        <span className="text-gray-700 ml-2">
                            Date:{" "}
                            {new Date(items[0].created_at).toLocaleDateString()}
                        </span>
                    </p>
                    <h1 className="text-4xl font-bold text-center text-pink-600 mb-2">
                        Invoice
                    </h1>
                </div>

                <div className="mb-3 flex justify-between ">
                    <div>
                        <img width={100} src={computerImage} alt="" />
                    </div>
                    <div className="flex justify-center flex-col items-center">
                        <p className="text-gray-700 ">{seller.name}</p>
                        <p className="text-gray-700">{seller.address}</p>
                        <p className="text-gray-700">Phone: {seller.phone}</p>
                        <p className="text-gray-700">
                            Servise: {seller.servise}
                        </p>
                        <p className="text-gray-700">State: {seller.state}</p>
                        <p className="text-gray-700">Email: {seller.email}</p>
                    </div>

                    <div>
                        <img width={100} src={computerImage} alt="" />
                    </div>
                </div>

                {buyer && (
                    <div className="mb-2 flex justify-center flex-col items-center">
                        <h3 className="text-xl font-semibold text-pink-500">
                            Buyer
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
                    <thead className="">
                        <tr>
                            <th className="p-4 border-b text-center text-pink-600 max-w-[100px]">
                                Product
                            </th>
                            <th className="p-4 border-b text-center text-pink-600">
                                HSN/SAC
                            </th>

                            <th className="p-4 border-b text-center text-pink-600">
                                GST
                            </th>
                            <th className="p-4 border-b text-center text-pink-600">
                                discount
                            </th>
                            <th className="p-4 border-b text-center text-pink-600">
                                Quantity
                            </th>
                            <th className="p-4 border-b  text-pink-600 text-center">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-pink-50"
                            >
                                <td className="p-4 text-gray-700 max-w-[100px] ">
                                    {item.product.brand.name}-
                                    {item.product.category.name} <br />
                                    {""}
                                    {renderWarranty(item)} <br />
                                    {item.sl_no}
                                </td>
                                <td className="p-4 text-gray-700 text-center">
                                    {item.product.category.hsn_code}
                                </td>

                                <td className="p-4 text-gray-700 text-center">
                                    {item.product.category.gst}%
                                </td>
                                <td className="p-4 text-gray-700 text-center">
                                    {parseInt(
                                        item.product.details
                                            ? item.product.details.discount
                                            : 0
                                    )}
                                    %
                                </td>
                                <td className="p-4 text-gray-700 text-center">
                                    {item.quantity}
                                </td>
                                <td className="p-4 text-gray-700">
                                    <div className=" h-[50%] border-b pb-2">
                                        price: ₹
                                        {parseInt(item.price).toLocaleString()}{" "}
                                    </div>
                                    <br />
                                    <div className="h-[50%]">
                                        Total: ₹
                                        {calculateTotal(
                                            item.price,
                                            item.product.category.gst,
                                            item.product.details
                                                ? parseInt(
                                                      item.product.details
                                                          .discount
                                                  )
                                                : 0,
                                            item.quantity
                                        ).toLocaleString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="border-t pt-4 border-b mb-4">
                    <div className="flex justify-between font-semibold text-gray-700">
                        <span>Subtotal</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold  text-gray-700">
                        <span>Discount</span>
                        <span>-₹{parseInt(discount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl text-pink-600">
                        <span>Total</span>
                        <span>₹{totalAfterDiscount.toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex justify-between text-gray-700 wifull mb-2">
                    {toWords(totalAfterDiscount) + " " + "rupees"}
                </div>

                <div className="w-full flex">
                    <div className="text-center text-pink-600 w-[70%] text-sm font-semibold">
                        <p>
                            {`শর্তাবলী- 1) কোন কারণে কোন ফেরত নেই. 2) যেকোনো
                            পরিষেবায় 15 থেকে 45 দিন সময় লাগবে। 3) পরিষেবাতে
                            জমা দিয়ে আইডি নম্বর নিতে হবে। 4) পরিষেবাতে জমা
                            দেওয়া পণ্যগুলি অবশ্যই 90 দিনের মধ্যে সরবরাহ করতে
                            হবে। 5) বিলিং করার পরে পণ্য ফেরত বা বিনিময় নেই। 6)
                            কোন ভাঙ্গা, ফাটল পণ্য পরিষেবা প্রদান করা হয় না. 7)
                            বিল অফ লেডিং ছাড়া কোন সেবা প্রদান করা হবে না. 8)
                            আমি সম্পূর্ণরূপে জানি এবং আমার পণ্য বুঝতে.`}
                        </p>
                    </div>
                    <div className="w-[30%] text-gray-700 flex justify-center items-center pt-10 ">
                        <p className="border-t"> Authorised Signetory</p>
                    </div>
                </div>

                <div className="w-full flex justify-center">
                    <div className=" text-pink-600 flex justify-center items-center pt-7 ">
                        <p className="border-t"> {`ক্রেতার স্বাক্ষর`}</p>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 hover:opacity-25 flex justify-center items-center">
                <button
                    onClick={handlePrint}
                    className="text-white text-sm font-semibold px-4 py-2 rounded-md bg-pink-600 hover:bg-pink-700"
                >
                    Print
                </button>
            </div>
        </div>
    );
};

export default Invoice;
