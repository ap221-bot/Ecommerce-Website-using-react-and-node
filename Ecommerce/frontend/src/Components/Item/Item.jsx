import React from "react";
import './Item.css'
import { Link } from "react-router-dom";

const Item = (props) => {
    return (
        <div className="item">
            <Link to={`/product/${props.id}`}><img src={props.image} alt="lol don't wanna show you image"/></Link>
            <p>{props.name}</p>
            <div className="itemPrice">
                <div className="newPrice">
                    {props.new_price}
                </div>
                <div className="oldPrice">
                    {props.old_price}
                </div>
            </div>
        </div>
    )
}
export default Item