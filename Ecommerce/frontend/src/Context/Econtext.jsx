import React, { createContext, useEffect, useState } from "react";

// Function to initialize cart items
const getCart = () => {
    let cart = {};
    for (let i = 0; i < 200; i++) {
        cart[i] = 0;
    }
    return cart;
}

// Create context for global state management
export const EContext = createContext(null);

const EContextProvider = (props) => {

    // State for all products and cart items
    const [all_product,setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getCart);

    // Fetch all products and cart data on component mount
    useEffect(()=>{
        // Fetch all products from the server
        fetch('http://localhost:5000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAllProduct(data))

        // Check if user is logged in and fetch cart data if available
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:5000/getdataforcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])


    // Function to add items to the cart
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        // Send request to server to update cart data
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:5000/addtocart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    // Function to remove items from the cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        // Send request to server to update cart data
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:5000/deletefromcart",{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            }).then((response)=>response.json()).then((data)=>console.log(data));
        }
    }

    // Function to calculate total item count in the cart
    const getTotalItemCount = () => {
        let total = 0;
        const cartItemValues = Object.values(cartItems);
    
        for (let i = 0; i < cartItemValues.length; i++) {
            if (cartItemValues[i] > 0) {
                const itemId = Object.keys(cartItems)[i];
                const itemDetail = all_product.find((product) => product.id === Number(itemId));
                total += itemDetail.new_price * cartItemValues[i];
            }
        }
        
        return total;
    }
    
    // Function to calculate total count of items in the cart
    const getTotalCount = () => {
        let total = 0;
        const cartItemValues = Object.values(cartItems);
    
        for (let i = 0; i < cartItemValues.length; i++) {
            if (cartItemValues[i] > 0) {
                const itemId = Object.keys(cartItems)[i];
                const itemDetail = all_product.find((product) => product.id === Number(itemId));
                total += cartItemValues[i];
            }
        }
        return total;
    }
    

    // Context value containing all necessary functions and state
    const contextValue = { getTotalCount,getTotalItemCount, all_product, cartItems, addToCart, removeFromCart }

    // Provide context value to child components
    return (
        <EContext.Provider value={contextValue}>
            {props.children}
        </EContext.Provider>
    )
}

export default EContextProvider;