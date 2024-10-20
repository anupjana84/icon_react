import React from "react";
import DynamicTableForm from "../../../layout/products/ProductChuncUplod";
import PageHeader from "../../../layout/components/pageHeader";
import PurchaseForm from "../../../layout/purchase/PurchaseForm";

export default function Create({ category, brands, company }) {
    return (
        <>
            <main className=" mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Purchase » Add"
                    link="/purchase"
                    linkName="Back"
                />

                {/* <p>content</p> */}
                {/* <ProductAddForm category={category} brands={brands} /> */}
                <PurchaseForm
                    category={category}
                    brands={brands}
                    company={company}
                />

                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <h4>page</h4>
                </div> */}
            </main>
        </>
    );
}
