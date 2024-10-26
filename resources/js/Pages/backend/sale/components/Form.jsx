import { useForm, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../../../../layout/components/AlertMessage";
import axios from "axios";
export default function PurchaseForm({ brands, category }) {
    // console.log(company);
    const [isSearching, setIsSearching] = useState(false);
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
        name: "",
        phone: "",
        address: "",
        wpnumber: "",
        pin: "",
        payment: "",
        orderId: "",
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
            },
        ],
    });
    useEffect(() => {
        if (isSearching) {
            axios
                .get("/customers/search", {
                    params: { phone: data.phone },
                })
                .then((response) => {
                    if (response.data) {
                        // Auto-fill form if a customer is found
                        setData({
                            ...data,
                            name: response.data.name || "",
                            address: response.data.address || "",
                            wpnumber: response.data.wpnumber || "",
                            pin: response.data.pin || "",
                            custId: response.data.id || "",
                        });
                    } else {
                        // Only reset fields if no customer is found
                        setData((prevData) => ({
                            ...prevData,
                            name: "",
                            address: "",
                            wpnumber: "",
                            pin: "",
                        }));
                    }
                    setIsSearching(false);
                })
                .catch((error) => {
                    console.error("Error fetching customer data:", error);
                    setIsSearching(false);
                });
        }
    }, [isSearching, data.phone]); // Dependencies: search when name or phone changes

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setData("phone", value);
        // Trigger search when phone number is valid and name is filled
        if (value.length > 9) {
            setIsSearching(true);
        }
    };

    // Function to calculate total rate
    const calculateTotalRate = (saleRate, userQuantity) => {
        const quantity = parseInt(userQuantity, 10);
        const rate = parseFloat(saleRate);
        return isNaN(quantity) || isNaN(rate) ? 0 : quantity * rate;
    };

    const handleInputChange = async (index, field, value) => {
        // console.log(index, field, value);
        const updatedRows = [...data.rows];
        updatedRows[index][field] = value;

        // console.log(value.length);

        // Check if the field being updated is 'code' and length is 19 characters
        if (field === "code" && value.length === 19) {
            try {
                const response = await axios.get(`/products/${value}`); // Fetch product by code
                const itemDetails = response.data;
                // Automatically fill other fields if the item is found
                if (itemDetails) {
                    updatedRows[index] = {
                        ...updatedRows[index],
                        category: itemDetails.category.name,
                        brand: itemDetails.brand.name,
                        model: itemDetails.model,
                        rate: itemDetails.sale_price,
                        productQuantity: itemDetails.quantity,
                        quantity: 1,
                        saleRate: parseInt(itemDetails.sale_price),
                        point: itemDetails.point,
                        freeDelivery: itemDetails.free_delivery,
                        productId: itemDetails.id || "",
                    };
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                // You can set an error message here if needed
            }
        }
        if (field === "quantity" || field === "saleRate") {
            updatedRows[index].rate = calculateTotalRate(
                updatedRows[index].saleRate,
                updatedRows[index].quantity
            );
            console.log(data);
        }

        // If the input is filled and it's the last row, add a new row
        if (value !== "" && index === updatedRows.length - 1) {
            updatedRows.push({
                code: "",
                category: "",
                brand: "",
                model: "",
                quantity: "",
                rate: "",
                saleRate: "",
                point: "",
                freeDelivery: "no",
            });
        }

        // Remove the row if all values are empty
        const allFieldsEmpty = Object.values(updatedRows[index]).every(
            (val) => val === ""
        );
        if (allFieldsEmpty) {
            updatedRows.splice(index, 1);
        }

        setData("rows", updatedRows);
    };

    const handleSave = (e) => {
        // e.preventDefault();

        // Filter out the empty rows
        const filteredRows =
            data.rows.length > 1 ? data.rows.slice(0, -1) : data.rows;

        // Send the filtered data to the backend
        console.log(data);
        setData({ ...data, rows: filteredRows });
        if (data.rows.length > 1) {
            setSeved(true);
        }
        post("/sales");
    };

    // const handelSubmit = () => {
    //     // e.preventDefault();
    //     post("/purchase/store");
    // };

    router.on("success", () => {
        setData({
            name: "",
            phone: "",
            address: "",
            wpnumber: "",
            pin: "",
            payment: "",
            rows: [
                {
                    code: "",
                    category: "",
                    brand: "",
                    model: "",
                    quantity: "",
                    rate: "",
                    saleRate: "",
                    point: "",
                    freeDelivery: "no",
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
                        htmlFor="name"
                    >
                        Customer Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.name
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Customer Name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="phone"
                    >
                        Customer Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={data.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.phone
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Customer Phone"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="wpnumber"
                    >
                        Customer WhatsApp
                    </label>
                    <input
                        type="tel"
                        id="wpnumber"
                        name="wpnumber"
                        value={data.wpnumber}
                        onChange={(e) => setData("wpnumber", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.wpnumber
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Customer WhatsApp"
                    />
                    {errors.wpnumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.wpnumber}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="pin"
                    >
                        Customer Pin Code
                    </label>
                    <input
                        type="tel"
                        id="pin"
                        name="pin"
                        value={data.pin}
                        onChange={(e) => setData("pin", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.pin
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Customer Pin Code"
                    />
                    {errors.pin && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.pin}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="address"
                    >
                        Customer Address
                    </label>
                    <textarea
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.address
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Customer Address"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="payment"
                    >
                        Payment
                    </label>
                    <select
                        id="payment"
                        name="payment"
                        value={data.payment}
                        onChange={(e) => setData("payment", e.target.value)}
                        className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.payment
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    >
                        <option value="">Select Payment</option>
                        <option value="cash">Cash</option>
                        <option value="online">Online</option>
                        {/* <option value="emi">EMI</option> */}
                    </select>
                    {errors.payment && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.payment}
                        </p>
                    )}
                </div>
            </div>

            {/* Dynamic Table */}
            <div
                className="overflow-x-auto max-h-[400px] hover:overflow-y-hidden"
                ref={tableRef}
            >
                <table className=" bg-white border border-gray-200 mb-4 mt-4 min-w-[1100px]">
                    <thead>
                        <tr>
                            {[
                                "CODE",
                                "ITEM",
                                "COMPANY",
                                "MODEL",
                                "QUANTITY",
                                "RATE",
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
                                    <input
                                        type="string"
                                        value={row.code}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "code",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.code`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Code"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
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
                                        className={`w-full px-2 cursor-not-allowed py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.category`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Item"
                                        disabled
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="text"
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
                                        className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.brand`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        disabled
                                        placeholder="Brand Name"
                                    />
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
                                        className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.model`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Model"
                                        disabled
                                    />
                                </td>

                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => {
                                            handleInputChange(
                                                index,
                                                "quantity",
                                                e.target.value
                                            );
                                        }}
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.quantity`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="Quantity"
                                        min={1}
                                        max={row.productQuantity}
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={parseFloat(row.rate)}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "rate",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.rate`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        disabled
                                        placeholder="Rate"
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <input
                                        type="number"
                                        value={parseFloat(row.saleRate)}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "saleRate",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black cursor-not-allowed border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.saleRate`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        disabled
                                        placeholder="Sale Rate"
                                    />
                                </td>

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
                                        className={`w-full px-2 py-1 cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.point`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        disabled
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
                                        className={`w-full px-2 py-[6px] cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.freeDelivery`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        disabled
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