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

    return (
        <main className=" max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader title="Sales » Invoice" link="/sales" linkName="Back" />
            <Invoice
                seller={seller}
                buyer={sale.customer}
                items={sale.sales_items}
                discount={sale.discount}
                gstNumber={sale.gst_number}
                id={sale.id}
            />
        </main>
    );
};

export default InvoiceBill;
