import React from "react";
import PageHeader from "../../../layout/components/pageHeader";

export default function Index() {
    return (
        <>
            <main className="max-w-7xl mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Sales"
                    link="/sales/create"
                    linkName="Add Sales"
                />
            </main>
        </>
    );
}
