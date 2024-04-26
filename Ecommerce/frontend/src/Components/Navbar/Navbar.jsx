import React, { useContext, useState } from "react"
import './Navbar.css'
import logo from '../Assets/logo.jpg'
import cartIcon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom"
import { EContext } from "../../Context/Econtext"

const Navbar = () => {
    
    /* ceating use state variable for chaging the bottom line of the category when clicked */
    const [category,setCategory] = useState("Home");
    console.log(EContext);
    const {getTotalCount} = useContext(EContext);

    return (
        <div className="navbar">
            <div className="logo">
                <Link to="/"><img src={logo} alt="Lol logo image is not loaded"></img></Link>
                <Link to="/" style={{textDecoration: 'none'}}><b>E-Shopping</b></Link>
            </div>
            <ul className="category">
                <li onClick={()=>{setCategory("Home")}}><Link style={{textDecoration: 'none'}} to="/">Home</Link>{category==="Home"?<hr/>:<></>}</li>
                <li onClick={()=>{setCategory("SmartPhone")}}><Link style={{textDecoration: 'none'}} to="/SmartPhone">SmartPhone</Link>{category==="SmartPhone"?<hr/>:<></>}</li>
                <li onClick={()=>{setCategory("Laptop")}}><Link style={{textDecoration: 'none'}} to="/Laptop">Laptop</Link>{category==="Laptop"?<hr/>:<></>}</li>
            </ul>
            <div className="Login_And_Cart">
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
                <Link to="/login"><button>Login</button></Link>}
                <Link to="/cart"><img src={cartIcon} alt="Cart Icon not loaded"></img></Link>
                <div className="count">{getTotalCount()}</div>
            </div>
        </div>
    )
}

export default Navbar