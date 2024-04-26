import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return(
        <div className="sidebar-body">
            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className="items">
                    <p>All Products</p>
                </div>
            </Link>
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="items">
                    <p>Add Product</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar