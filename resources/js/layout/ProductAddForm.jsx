// src/components/ProductForm.js

import { useForm } from '@inertiajs/react'
import React, { useState } from "react";

const ProductAddForm = ({category,brand}) => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        sale_price: 0,
        puchage_price: 0,
        quantity: "",
        category: "",
        brand: "",
        model: "",
        hsn_code: "",
        product_gst: "",
        point: "",
        Phone: "",
        description: "",
        free_delivery: "inactive",
        pruchase_address: "",
        pruchase_phone: "",
        pruchase_gst: "",
        pruchase_invoice_no: "",
        pruchase_date: "",
        pruchase_receive_date: "",
        stock: "",
        sku: "",
        weight: "",
        color: "",
        discount: "",
        image_url: [],
        image_url_thum: null,
        status: "active",
        available_from: "",
        thumbnail:"",
        
      })

     
    const [formData, setFormData] = useState({
        
        image_url: [],
        image_url_thum: null,
        thumbnail:"",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        console.log(file)

        // if (file.size > 1024 * 1024) {
        //     errorMessage("File size must be less than 1MB");
        //     return;

        //     // setStatus('Invalid file address');
        // }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader)
        reader.onload = () => {
           
            setFormData({
                ...formData,
                thumbnail: e.target.files[0], 
            });
        };
       
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // data.image_url= formData.image_url
        // data.thumbnail =formData.thumbnail
        // data.name='dddddd'
        // console.log(data)
        // post('/products')
      
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
         console.log(files)
        // const reader = new FileReader();
        // reader.readAsDataURL(files);
        // console.log(reader)
        // reader.onload = () => {
           
        //     setFormData({
        //         ...formData,
        //         image_url: files, 
        //     });
        // };
        setFormData({
            ...formData,
            image_url: files, // Store the array of multiple images
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl text-black font-bold mb-6">Product Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Sale Price */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Sale Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-black font-bold mb-2"
                            htmlFor="sale_price"
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="name"
                           
                            value={data.name}
                            onChange={(e)=>setData('name',e.target.value)}
                            className="w-full px-3 py-2
                            text-black
                             border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Product Name"
                            required
                        />
                    </div>

                    {/* Purchase Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="purchase_price"
                        >
                            Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={data.model}
                            onChange={(e)=>setData('model',e.target.value)}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Model"
                            required
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Sale Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-black font-bold mb-2"
                            htmlFor="sale_price"
                        >
                            Sale Price
                        </label>
                        <input
                            type="number"
                            id="sale_price"
                            name="sale_price"
                            value={data.sale_price}
                            onChange={(e)=>setData('sale_price',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="0"
                            required
                        />
                    </div>

                    {/* Purchase Price */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="purchase_price"
                        >
                            Puchase Price
                        </label>
                        <input
                            type="number"
                            id="purchase_price"
                            name="purchase_price"
                            value={data.purchase_price}
                            onChange={()=>setData('purchase_price',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="0"
                            required
                        />
                    </div>
                </div>

                {/* Quantity */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="quantity"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={data.quantity}
                            onChange={(e)=>setData('quantity',e.target.value)}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="0"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="category"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={(e)=>setData('category',e.target.value)}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Category"
                            required
                        />
                    </div>
                </div>

                {/* Brand */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="brand"
                        >
                            Brand
                        </label>
                        <select
                            id="brand"
                            name="brand"
                            value={data.brand}
                            onChange={(e)=>setData('brand',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {/* <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Brand"
                        /> */}
                    </div>

                    {/* Model */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="model"
                        >
                            Phone
                        </label>
                        <input
                            id="Phone"
                            name="Phone"
                            value={data.Phone}
                            onChange={(e)=>setData('Phone',e.target.value)}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Model"
                            required
                        />
                    </div>
                </div>

                {/* HSN Code */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="hsn_code"
                        >
                            HSN Code
                        </label>
                        <input
                            id="hsn_code"
                            name="hsn_code"
                            value={data.hsn_code}
                            onChange={(e)=>setData('hsn_code',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="HSN Code"
                            required
                        />
                    </div>

                    {/* Product GST */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="product_gst"
                        >
                            Product GST
                        </label>
                        <input
                            id="product_gst"
                            name="product_gst"
                            value={data.product_gst}
                            onChange={(e)=>setData('product_gst',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Product GST"
                        />
                    </div>
                </div>

                {/* Point */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="point"
                        >
                            Point
                        </label>
                        <input
                            type="number"
                            id="point"
                            name="point"
                            value={data.point}
                            onChange={(e)=>setData('point',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Point"
                        />
                    </div>

                    {/* Description */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e)=>setData('description',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Description"
                        />
                    </div>
                </div>

                {/* Free Delivery */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="free_delivery"
                        >
                            Free Delivery
                        </label>
                        <select
                            id="free_delivery"
                            name="free_delivery"
                            value={data.free_delivery}
                            onChange={(e)=>setData('free_delivery',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    {/* Purchase Address */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_address"
                        >
                            Purchase Address
                        </label>
                        <textarea
                            type="text"
                            id="pruchase_address"
                            name="pruchase_address"
                            value={data.pruchase_address}
                            onChange={(e)=>setData('pruchase_address',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Purchase Address"
                        />
                    </div>
                </div>

                {/* Purchase Phone */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_phone"
                        >
                            Purchase Phone
                        </label>
                        <input
                            type="tel"
                            id="pruchase_phone"
                            name="pruchase_phone"
                            value={data.pruchase_phone}
                            onChange={(e)=>setData('pruchase_phone',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Purchase Phone"
                        />
                    </div>

                    {/* Purchase GST */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_gst"
                        >
                            Purchase GST
                        </label>
                        <input
                            type="text"
                            id="pruchase_gst"
                            name="pruchase_gst"
                            value={data.pruchase_gst}
                            onChange={(e)=>setData('pruchase_gst',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Purchase GST"
                        />
                    </div>
                </div>

                {/* Purchase Invoice No */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_invoice_no"
                        >
                            Purchase Invoice No
                        </label>
                        <input
                            type="text"
                            id="pruchase_invoice_no"
                            name="pruchase_invoice_no"
                            value={data.pruchase_invoice_no}
                            onChange={(e)=>setData('pruchase_invoice_no',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Purchase Invoice No"
                        />
                    </div>

                    {/* Purchase Date */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_date"
                        >
                            Purchase Date
                        </label>
                        <input
                            type="date"
                            id="pruchase_date"
                            name="pruchase_date"
                            value={data.pruchase_date}
                            onChange={(e)=>setData('pruchase_date',e.target.value)}
                            className="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>

                {/* Purchase Receive Date */}
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="pruchase_receive_date"
                        >
                            Purchase Receive Date
                        </label>
                        <input
                            type="date"
                            id="pruchase_receive_date"
                            name="pruchase_receive_date"
                            value={data.pruchase_receive_date}
                            onChange={(e)=>setData('pruchase_receive_date',e.target.value)}
                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>

                    {/* Stock */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="discount"
                        >
                            Discount
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="discount"
                            name="discount"
                            value={data.discount}
                            onChange={(e)=>setData('discount',e.target.value)}

                            className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Discount"
                        />
                    </div>
                </div>

                {/* SKU */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="sku"
                    >
                        SKU
                    </label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="SKU"
                    />
                </div> */}

                {/* Weight */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="weight"
                    >
                        Weight
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Weight"
                    />
                </div> */}

                {/* Color */}
                {/* <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="color"
                    >
                        Color
                    </label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Color"
                    />
                </div> */}

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 
                            border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                        >
                            <option value="active" className="text-black">
                                Active
                            </option>
                            <option value="inactive" className="text-black">
                                Inactive
                            </option>
                        </select>
                    </div>

                    {/* Available From */}
                    <div className="relative z-0 w-full mb-5 group">
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="available_from"
                        >
                            Available From
                        </label>
                        <input
                            type="date"
                            id="available_from"
                            name="available_from"
                            value={formData.available_from}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        />
                    </div>
                </div>

                {/* Image URL */}
             
                {formData.thumbnail && (
                <div>
                    <h4 className="text-blue-600">Thumbnail Image Preview:</h4>
                    <img
                        src={typeof formData.thumbnail === 'string' 
                             ? formData.thumbnail 
                             : URL.createObjectURL(formData.thumbnail)}
                        alt="Thumbnail Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                </div>
            )}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="thumbnail"
                    >
                        Image
                    </label>
                    {/* <img src={thumbnail} width={150} height={150} className="border rounded"/> */}
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        
                        onChange={handleThumbnailChange}
                        className="w-full
                      
                        px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Image URL"
                    />
                </div>
                {/* <img src={thumbnail} width={150} height={150} className="border rounded"/> */}

                {/* Image URL Thumbnail */}

                {formData.image_url.length > 0 && (
                <div>
                    <h4 className="text-red-500"> Thumbnail Image Previews:</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {formData.image_url.map((file, index) => (
                          
                            <img
                                key={index}
                                src={URL.createObjectURL(file)}
                                alt={`Image ${index + 1}`}
                                className="w-12 h-12 object-cover rounded-lg"
                            />
                        ))}
                    </div>
                </div>
            )}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="image_url_thum"
                    >
                         Image Multiple
                    </label>
                    <input
                        type="file"
                        id="image_url"
                        name="image_url"
                        multiple
                        onChange={handleImagesChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Image URL Thumbnail"
                    />
                </div>

                {/* Status */}

                {/* Submit Button */}

                <div className="w-full">
                    <button
                        type="submit"
                        className="bg-blue-500
                        w-full text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAddForm;
