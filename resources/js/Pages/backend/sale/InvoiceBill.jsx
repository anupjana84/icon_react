// src/App.js
import React from "react";
import Invoice from "./components/Invoice";
import PageHeader from "../../../layout/components/pageHeader";

const InvoiceBill = ({ sale }) => {
    console.log(sale);

    // Proxy data
    const seller = {
        name: "ICON COMPUTER",
        address: "Fultata, Bthuadahari, Nadia, pin-741126 ",
        phone: "9332226500",
        servise: "8670569446",
        state: "West Bengal, code: 19",
        email: "prithwisroy@yahoo.com",
    };

    // Function to split array into chunks of specified size
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    // Split sales items into chunks of 2 items each
    let count = 3;
    if (sale.customer) {
        count = 4;
    }
    const salesItemsChunks = chunkArray(sale.sales_items, count);

    return (
        <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader title="Sales » Invoice" link="/sales" linkName="Back" />

            {salesItemsChunks.map((itemsChunk, index) => (
                <Invoice
                    key={index}
                    seller={seller}
                    buyer={sale.customer}
                    items={itemsChunk} // Pass each chunk of 2 items
                    discount={sale.discount}
                    gstNumber={sale.gst_number}
                    id={`${sale.id}`} // Unique ID for each Invoice component
                />
            ))}
        </main>
    );
};

export default InvoiceBill;
