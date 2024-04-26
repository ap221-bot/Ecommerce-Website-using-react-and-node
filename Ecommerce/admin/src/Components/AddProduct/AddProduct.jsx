import React, { useState } from "react";
import "./AddProduct.css"
import upload_icon from '../../assets/upload_icon.png'

const AddProduct = () => {

    // State for the selected image file
    const [image,setImage] = useState(false);

    // Function to handle image selection
    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    // State for product details form
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "SmartPhone",
        new_price: "",
        old_price: ""
    })

    // Function to handle form input changes
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    // Function to add product to database
    const Add_Product = async () => {
        console.log(productDetails);
        let resData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product',image);

        // Upload image to server
        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{resData=data})

        if(resData.success)
        {
            product.image = resData.image_url; // Update product image URL
            console.log(product); // Log updated product details
            // Add product to database
            await fetch('http://localhost:5000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added to the database"):alert("Something bad has happened")
            })
        }
        
    }


    return (
        <div className="addProduct-body">
            <div className="addProductItemsField">
                <p>Product Title</p>
                <input type="text" name="name" value={productDetails.name} onChange={changeHandler} placeholder="Please Enter Product Title" />
            </div>
            <div className="price">
                <div className="addProductItemsField">
                    <p>Old Price</p>
                    <input type="text" name="old_price" value={productDetails.old_price} onChange={changeHandler} placeholder="Please Enter Old Price" />
                </div>
                <div className="addProductItemsField">
                    <p>New Price</p>
                    <input type="text" name="new_price" value={productDetails.new_price} onChange={changeHandler} placeholder="Please Enter New Price" />
                </div>
            </div>
            <div className="addProductItemsField">
                <p>Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="selector">
                    <option value="SmartPhone">SmartPhone</option>
                    <option value="Laptop">Laptop</option>
                </select>
            </div>
            <div className="addProductItemsField1">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_icon} className="addProduct-img"/>
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={()=>{Add_Product()}} className="addProduct_Btn">Add Product</button>
        </div>
    )
}

export default AddProduct