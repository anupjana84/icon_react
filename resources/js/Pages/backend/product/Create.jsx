import React, { useState } from "react";

import Header from "@/layout/header";
import ProductAddForm from "@/layout/ProductAddForm";
import PageHeader from "../../../layout/components/pageHeader";
import DynamicTableForm from "../../../layout/products/ProductChuncUplod";

const Create = ({ category, brands, company }) => {
    // console.log(category);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Handle form submission logic here
    //     post('/brands')
    // };
    // const [count, setCount] = useState(0);
    return (
        <>
            <main className=" mx-auto py-1 px-1 lg:px-1">
                <PageHeader
                    title="Product » Add"
                    link="/products"
                    linkName="Back"
                />

                {/* <p>content</p> */}
                {/* <ProductAddForm category={category} brands={brands} /> */}
                <ProductAddForm
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
};

export default Create;
