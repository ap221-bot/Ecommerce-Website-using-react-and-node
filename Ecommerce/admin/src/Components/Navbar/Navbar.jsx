import React from "react";
import "./Navbar.css"
import logo from "../../assets/logo.jpg"
import userProfile from "../../assets/userProfile.jpg"

const Navbar = () =>{
    return(
        <div className="body">
            <img src={logo} alt="" className="logo" />
            <img src={userProfile} className="userProfile" alt="" />
        </div>
    )
}

export default Navbar