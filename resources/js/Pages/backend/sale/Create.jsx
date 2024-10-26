import React from "react";
import PageHeader from "../../../layout/components/pageHeader";
import SalesForm from "./components/Form";

export default function Create() {
    return (
        <main className=" max-w-7xl mx-auto py-1 px-1 lg:px-1">
            <PageHeader title="Sales » Add" link="/sales" linkName="Back" />

            <SalesForm />
        </main>
    );
}
