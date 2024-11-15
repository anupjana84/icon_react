import { useForm, router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import Alert from "../../../../layout/components/AlertMessage";
import axios from "axios";
import { SalesModel } from "./Model";
export default function PurchaseForm() {
    // console.log(company);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        online: "",
        cash: "",
        salesman: "",
        gstNumber: "",
        finance: "",
        discount: "",
        total: "",
        grandTotal: "",

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
                warranty: "",
                sl_no: "",
                gst: 0,
                discount: 0,
            },
        ],
    });
    // console.log(errors);
    useEffect(() => {
        if (isSearching) {
            axios
                .get("/customers/search", {
                    params: { phone: data.phone },
                })
                .then((response) => {
                    if (response.data) {
                        console.log(response.data);
                        // Auto-fill form if a customer is found
                        setData({
                            ...data,
                            name: response.data.name || "",
                            address: response.data.address || "",
                            wpnumber: response.data.wpnumber || "",
                            pin: response.data.pin || "",
                            custId: response.data.id || "",
                            salesman: response.data.salesman || "",
                        });
                    } else {
                        // Only reset fields if no customer is found
                        setData((prevData) => ({
                            ...prevData,
                            name: "",
                            address: "",
                            wpnumber: "",
                            pin: "",
                            custId: "",
                            salesman: "",
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
                const response = await axios.get(`/code/${value}`); // Fetch product by code
                const itemDetails = response.data;
                console.log(itemDetails);
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
                        warranty: "",
                        gst: itemDetails.category.gst,
                        discount: itemDetails.details?.discount,
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
                warranty: "",
                sl_no: "",
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

    const handleSave = () => {
        // Filter rows to remove empty ones if there are multiple rows
        const filteredRows =
            data.rows.length > 1
                ? data.rows.filter((row) => row.code)
                : data.rows;

        // Update the data with filtered rows
        setData({ ...data, rows: filteredRows });

        // Send a validation request to the backend
        post("/sales-validate", data, {
            preserveScroll: true,
        });
        if (data.rows.length > 1) {
            setSeved(true);
            setIsModalOpen(true);
        }
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        // Final submission after discount has been applied
        post("/sales", data, {
            onSuccess: () => {
                setMessage({
                    visible: true,
                    description: "Sales created successfully!",
                    type: "success",
                    title: "Success",
                });
                setIsModalOpen(false);
                setSeved(false);
                reset(); // Reset Inertia form state if needed

                // Reset data to the initial state
                setData({
                    name: "",
                    phone: "",
                    address: "",
                    wpnumber: "",
                    pin: "",
                    payment: "",
                    orderId: "",
                    online: "",
                    cash: "",
                    salesman: "",
                    gstNumber: "",
                    finance: "",
                    discount: "",
                    total: "",
                    grandTotal: "",
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
                            warranty: "",
                            sl_no: "",
                            gst: 0,
                            discount: 0,
                        },
                    ],
                });
            },
            onError: (errors) => {
                console.error("Submission errors:", errors);
                // Handle submission errors if needed
            },
        });
    };

    // console.log(data);

    // router.on("success", () => {
    //     setData({
    //         name: "",
    //         phone: "",
    //         address: "",
    //         wpnumber: "",
    //         pin: "",
    //         payment: "",
    //         orderId: "",
    //         online: "",
    //         cash: "",
    //         salesman: "",
    //         gst: "",
    //         finance: "",
    //         rows: [
    //             {
    //                 code: "",
    //                 category: "",
    //                 brand: "",
    //                 model: "",
    //                 quantity: "",
    //                 rate: "",
    //                 saleRate: "",
    //                 point: "",
    //                 freeDelivery: "no",
    //             },
    //         ],
    //     });
    //     setMessage({
    //         visible: true,
    //         description: "Product created successfully!",
    //         type: "success",
    //         title: "🎉 Success",
    //     });
    // });

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg">
            {/* Additional Inputs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1 gap-x-6">
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

                {/* <div className="relative z-0 w-full mb-5 group">
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
                        <option value="">Select GST</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.gst && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.gst}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="cash"
                    >
                        Cash Payment
                    </label>
                    <input
                        type="number"
                        id="cash"
                        name="cash"
                        value={data.cash}
                        onChange={(e) => setData("cash", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.cash
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Cash Payment "
                        min={0}
                    />
                    {errors.cash && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.cash}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="online"
                    >
                        Online Payment
                    </label>
                    <input
                        type="number"
                        id="online"
                        name="online"
                        value={data.online}
                        onChange={(e) => setData("online", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.online
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter Online Payment"
                        min={0}
                    />
                    {errors.online && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.online}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="gstNumber"
                    >
                        GST Number
                    </label>
                    <input
                        type="text"
                        id="gstNumber"
                        name="gstNumber"
                        value={data.gstNumber}
                        onChange={(e) => setData("gstNumber", e.target.value)}
                        className={`w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.gstNumber
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                        placeholder="Enter GST Number"
                        min={0}
                    />
                    {errors.gstNumber && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.gstNumber}
                        </p>
                    )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label
                        className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                        htmlFor="finance"
                    >
                        Finance
                    </label>
                    <select
                        id="finance"
                        name="finance"
                        value={data.finance}
                        onChange={(e) => setData("finance", e.target.value)}
                        className={`w-full px-4 py-[10px] text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                            errors.finance
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-400"
                        }`}
                    >
                        <option value="">Select Finance</option>
                        <option value="hdb_finance">HDB Finance</option>
                        <option value="bajaj_finance">BAJAJ Finance</option>
                    </select>
                    {errors.finance && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.finance}
                        </p>
                    )}
                </div> */}
                {data.salesman && (
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-800 font-semibold mb-2 transition duration-200 ease-in-out transform group-focus-within:text-blue-500"
                            htmlFor="gst"
                        >
                            Salesman
                        </label>

                        <div className="w-full h-[45px] px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md flex space-x-4">
                            <div className="flex-1">
                                <input
                                    disabled
                                    type="text"
                                    value={data.salesman.user.name}
                                    placeholder="Name"
                                    className="w-full h-full px-2 py-1 border rounded focus:outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    disabled
                                    type="text"
                                    value={data.salesman.code}
                                    placeholder="Code"
                                    className="w-full h-full px-2 py-1 border rounded focus:outline-none"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    disabled
                                    type="number"
                                    value={
                                        data.salesman.point +
                                        data.salesman.other_point
                                    }
                                    placeholder="Point"
                                    className="w-full h-full px-2 py-1 border rounded focus:outline-none"
                                />
                            </div>
                        </div>

                        {errors.finance && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.finance}
                            </p>
                        )}
                    </div>
                )}
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
                                "CODE",
                                "SL. NO.",
                                "WARRANTY",
                                "ITEM",
                                "COMPANY",
                                "MODEL",
                                "QUANTITY",
                                "RATE",
                                "SALE RATE",
                                "POINT",
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
                                        type="string"
                                        value={row.sl_no}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "sl_no",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-1 text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.sl_no`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                        placeholder="SL No."
                                    />
                                </td>
                                <td className="px-2 py-2 border-x">
                                    <select
                                        value={row.warranty}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "warranty",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-2 py-[6px] cursor-not-allowed text-black border focus:outline-none focus:ring-2 transition duration-200 ease-in-out shadow-sm hover:shadow-md ${
                                            errors[`rows.${index}.warranty`]
                                                ? "border-red-500 focus:ring-red-400"
                                                : "border-gray-300 focus:ring-blue-400"
                                        }`}
                                    >
                                        <option value="">Select</option>
                                        <option value="7 Day">7 Day</option>
                                        <option value="1 Month">
                                            1 Months
                                        </option>
                                        <option value="3 Month">
                                            3 Months
                                        </option>
                                        <option value="6 Months">
                                            6 Months
                                        </option>
                                        <option value="10 Months">
                                            10 Months
                                        </option>
                                        <option value="1 Year">1 Year</option>
                                        <option value="2 Years">2 Years</option>
                                        <option value="3 Years">3 Years</option>
                                        <option value="5 Years">5 Years</option>
                                        <option value="Company Weranty">
                                            Company Weranty
                                        </option>
                                    </select>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {
                !saved && (
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
                )
                // : (
                // <div className="w-full">
                //     <button
                //         onClick={() => {
                //             handleSave();
                //         }}
                //         type="submit"
                //         className={`bg-blue-500 w-full text-white px-4 py-2 rounded-lg ${
                //             processing
                //                 ? "opacity-70 cursor-not-allowed"
                //                 : "hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                //         }`}
                //         disabled={processing}
                //     >
                //         {processing ? (
                //             <div className="flex items-center justify-center">
                //                 <svg
                //                     className="animate-spin h-5 w-5 mr-2 text-white"
                //                     xmlns="http://www.w3.org/2000/svg"
                //                     fill="none"
                //                     viewBox="0 0 24 24"
                //                 >
                //                     <circle
                //                         className="opacity-25"
                //                         cx="12"
                //                         cy="12"
                //                         r="10"
                //                         stroke="currentColor"
                //                         strokeWidth="4"
                //                     ></circle>
                //                     <path
                //                         className="opacity-75"
                //                         fill="currentColor"
                //                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                //                     ></path>
                //                 </svg>
                //                 Uploading...
                //             </div>
                //         ) : (
                //             "Submit"
                //         )}
                //     </button>
                // </div>
                // )
            }

            {message.visible && (
                <Alert
                    type={message.type} // You can change this to "error", "warning", or "info"
                    title={message.title}
                    description={message.description}
                    // onClose={handleClose}
                />
            )}

            <SalesModel
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSeved(false);
                }}
                data={data}
                setData={setData}
                processing={processing}
                errors={errors}
                handelSubmit={handelSubmit}
            />
        </div>
    );
}
