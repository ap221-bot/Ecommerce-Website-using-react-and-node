import React, { useEffect, useState } from "react";
import "./ListProduct.css"
import cart_cross_icon from '../../assets/cart_cross_icon.png'

const ListProduct = () => {

    // State to store all products
    const [allproducts,setAllProducts] = useState([]);

    // Function to fetch product information from the server
    const fetchProductInfo = async () => {
        await fetch('http://localhost:5000/allproducts').then((resp)=>resp.json()).then((data)=>{setAllProducts(data)});
    }

    // Fetch product info on component mount
    useEffect(()=>{
        fetchProductInfo();
    },[])

    // Function to delete a product
    const deleteProduct = async (id) =>{
        await fetch("http://localhost:5000/deleteproduct",{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        // Refresh product list after deletion
        await fetchProductInfo();
    }

    return(
        <div className="listProduct-body">
            <h1>All Products</h1>
            <div className="main_listProduct">
                <p>Products</p>
                <p>Product Name</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listing">
                <hr/>
                {allproducts.map((product,index)=>{
                    return <><div className="main_listProduct listProduct-format">
                        <img src={product.image} alt="" className="productIcon"/>
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{deleteProduct(product.id)}} className="removeIcon" src={cart_cross_icon} alt="" />
                    </div>
                    <hr/></>
                })}
            </div>
        </div>
    )
}

export default ListProduct