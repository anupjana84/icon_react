import { useForm, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../components/AlertMessage";
export default function PurchaseForm({ brands, category, company }) {
    // console.log(company);
    const [saved, setSeved] = useState(false);
    const [message, setMessage] = useState({
        visible: false,
        description: "",
        type: "",
        title: "",
    });
    const tableRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            // Prevent the default vertical scroll
            e.preventDefault();
            // Scroll horizontally
            if (tableRef.current) {
                tableRef.current.scrollLeft += e.deltaY;
            }
        };

        const tableElement = tableRef.current;

        // Add wheel event listener
        tableElement.addEventListener("wheel", handleWheel, { passive: false });

        // Clean up the event listener on component unmount
        return () => {
            tableElement.removeEventListener("wheel", handleWheel);
        };
    }, []);
    const { data, setData, post, errors, processing, reset } = useForm({
        company: "",
        purchase_invoice_no: "",
        purchase_date: "",
        purchase_receive_date: "",
        gst: "no",
        rows: [
            {
                category: "",
                brand: "",
                model: "",
                quantity: "",
                rate: "",
                saleRate: "",
                point: "",
                freeDelivery: "no",
                discount: "",
            },
        ],
    });

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...data.rows];
        updatedRows[index][field] = value;

        // If the input is filled and it's the last row, add a new row
        if (value !== "" && index === updatedRows.length - 1) {
            updatedRows.push({
                category: "",
                brand: "",
                model: "",
                quantity: "",
                rate: "",
                saleRate: "",
                point: "",
                freeDelivery: "no",
                discount: "",
            });
            setSeved(false);
        }

        // Remove the row if all values are empty, except if it's the only row left
        const allFieldsEmpty = Object.values(updatedRows[index]).every(
            (val) => val === ""
        );
        if (allFieldsEmpty && updatedRows.length > 1) {
            updatedRows.splice(index, 1);
        }

        // Update the rows state
        setData((prevData) => ({ ...prevData, rows: updatedRows }));
    };
    console.log(data);

    const handleSave = (e) => {
        // e.preventDefault();

        // Filter out the empty rows
        const filteredRows =
            data.rows.length > 1
                ? data.rows.filter((row) => row.category)
                : data.rows;

        // Send the filtered data to the backend
        console.log(filteredRows);
        setData({ ...data, rows: filteredRows });
        if (data.rows.length > 1) {
            setSeved(true);
        }
        post("/purchase/store");
    };

    // const handelSubmit = () => {
    //     // e.preventDefault();
    //     post("/purchase/store");
    // };

    router.on("success", () => {
        setData({
            company: "",
            purchase_invoice_no: "",
            purchase_date: "",
            purchase_receive_date: "",
            gst: "no",
            rows: [
                {
                    category: "",
                    brand: "",
                    model: "",
                    quantity: "",
                    rate: "",
                    saleRate: "",
                    point: "",
                    freeDelivery: "no",
                    discount: "",
                },
            ],
        });
        setMessage({
            visible: true,
            description: "Product created successfully!",
            type: "success",
            title: "🎉 Success",
        });
    });

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg">
            {/* Additional Inputs */}
            <div className="grid grid-cols-2 gap-y-1 gap-x-6">
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="company"
                    >
                        Company
                    </label>
                    <select
                        id="company"
                        name="company"
                        value={data.company}
                        onChange={(e) => setData("company", e.target.value)}
                        className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.company
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    >
                        <option value="">Select company</option>
                        {company &&
                            company.map((company) => (
                                <option key={company.id} value={company.id}>
                                    {company.name}
                                </option>
                            ))}
                    </select>
                    {errors.company && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.company}
                        </p>
                    )}
                </div>
                {/* <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pruchase_name"
                    >
                        Purchase Name
                    </label>
                    <input
                        type="text"
                        id="pruchase_name"
                        value={data.pruchase_name}
                        onChange={(e) =>
                            setData("pruchase_name", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.pruchase_name
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Purchase Name"
                    />
                    {errors.pruchase_name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.pruchase_name}
                        </p>
                    )}
                </div> */}

                {/* <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pruchase_phone"
                    >
                        Purchase Phone
                    </label>
                    <input
                        type="tel"
                        id="pruchase_phone"
                        name="pruchase_phone"
                        value={data.pruchase_phone}
                        onChange={(e) =>
                            setData("pruchase_phone", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.pruchase_phone
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Purchase Phone"
                    />
                    {errors.pruchase_phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.pruchase_phone}
                        </p>
                    )}
                </div> */}

                {/* <div className="relative z-0 w-full group">
                    <label className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500">
                        GST Number
                    </label>
                    <input
                        type="text"
                        id="pruchase_invoice_no"
                        name="pruchase_invoice_no"
                        value={data.gst_number}
                        onChange={(e) => setData("gst_number", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.gst_number
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="GST Number"
                    />
                    {errors.gst_number && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.pruchase_invoice_no}
                        </p>
                    )}
                </div> */}
                <div className="relative z-0 w-full group">
                    <label className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500">
                        Purchase Invoice No
                    </label>
                    <input
                        type="text"
                        id="pruchase_invoice_no"
                        name="pruchase_invoice_no"
                        value={data.purchase_invoice_no}
                        onChange={(e) =>
                            setData("purchase_invoice_no", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.purchase_invoice_no
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Purchase Invoice No"
                    />
                    {errors.purchase_invoice_no && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.purchase_invoice_no}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full  group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pruchase_date"
                    >
                        Purchase Date
                    </label>
                    <input
                        type="date"
                        id="pruchase_date"
                        name="pruchase_date"
                        value={data.purchase_date}
                        onChange={(e) =>
                            setData("purchase_date", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.purchase_date
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    />
                    {errors.pruchase_date && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.purchase_date}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full  group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pruchase_receive_date"
                    >
                        Purchase Receive Date
                    </label>
                    <input
                        type="date"
                        id="pruchase_receive_date"
                        name="pruchase_receive_date"
                        value={data.purchase_receive_date}
                        onChange={(e) =>
                            setData("purchase_receive_date", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.purchase_receive_date
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    />
                    {errors.purchase_receive_date && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.purchase_receive_date}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="gst"
                    >
                        GST
                    </label>
                    <select
                        id="gst"
                        name="gst"
                        value={data.gst}
                        onChange={(e) => setData("gst", e.target.value)}
                        className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.gst
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.gst && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.gst}
                        </p>
                    )}
                </div>

                {/* <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pruchase_address"
                    >
                        Purchase Address
                    </label>
                    <textarea
                        type="text"
                        id="pruchase_address"
                        name="pruchase_address"
                        value={data.pruchase_address}
                        onChange={(e) =>
                            setData("pruchase_address", e.target.value)
                        }
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.pruchase_address
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Purchase Address"
                    />
                    {errors.pruchase_address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.pruchase_address}
                        </p>
                    )}
                </div> */}
            </div>

            {/* Dynamic Table */}
            <div
                className="overflow-x-auto  hover:overflow-y-hidden"
                ref={tableRef}
            >
                <table className=" bg-white border border-gray-200 mb-4 mt-4 min-w-[1100px]">
                    <thead>
                        <tr>
                            {[
                                "ITEM",
                                "COMPANY",
                                "MODEL",
                                "QUANTITY",
                                "RATE",
                                "DISCOUNT",
                                "SALE RATE",
                                "POINT",
                                "DELIVERY",
                            ].map((header, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-1 border-x bg-gray-100 border-b text-left text-sm font-medium text-gray-700"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.rows.map((row, index) => (
                            <tr key={index} className="border-b">
                                {/* SLNO - row number */}
                                <td className="px-2 py-2 border-x">
                                    <select
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={row.category}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "category",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.category`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Item"
                                    >
                                        <option value="">Select</option>
                                        {category &&
                                            category.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <select
                                        id="brand"
                                        name="brand"
                                        value={row.brand}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "brand",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.brand`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                    >
                                        <option value="">Select</option>
                                        {brands &&
                                            brands.map((brand) => (
                                                <option
                                                    key={brand.id}
                                                    value={brand.id}
                                                >
                                                    {brand.name}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="text"
                                        value={row.model}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "model",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.model`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Model"
                                    />
                                </td>

                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.quantity`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Quantity"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.rate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "rate",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.rate`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Rate"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.discount}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "discount",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.discount`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Discount"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.saleRate}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "saleRate",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.saleRate`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Sale Rate"
                                    />
                                </td>
                                {/* <td className="px-2 py-2 border-x">
                                <input
                                    type="number"
                                    value={row.gst}
                                    onChange={(e) =>
                                        handleInputChange(
                                            index,
                                            "gst",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                        errors.gst
                                            ? "border-red-500 focus:ring-red-400"
                                            : "border-gray-300 focus:ring-blue-400"
                                    }`}
                                    placeholder="GST"
                                />
                            </td> */}
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.point}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "point",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.point`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Point"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <select
                                        value={row.freeDelivery}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "freeDelivery",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-[6px] text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.freeDelivery`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                    >
                                        <option value="no">No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!saved ? (
                <div className="w-full">
                    <button
                        onClick={() => {
                            handleSave();
                        }}
                        type="submit"
                        className={`bg-blue-500 w-full text-white px-4 py-2 rounded-lg  hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300
                   `}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div className="w-full">
                    <button
                        onClick={() => {
                            handleSave();
                        }}
                        type="submit"
                        className={`bg-blue-500 w-full text-white px-4 py-2 rounded-lg ${
                            processing
                                ? "opacity-70 cursor-not-allowed"
                                : "hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        }`}
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Uploading...
                            </div>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            )}

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
}
