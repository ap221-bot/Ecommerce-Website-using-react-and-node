import React, { useContext } from "react";
import './Productdetail.css';
import { EContext } from "../../Context/Econtext";

const Productdetail = (props) => {

    const {product} = props;
    const {addToCart} = useContext(EContext);


    return (
        <div className="productdetail">
            <div className="leftSide">
                <div className="productImage">
                    <img className="mainImg" src={product.image} alt="nai he"/>
                </div>
            </div>
            <div className="rightSide">
                <h1>{product.name}</h1>
                <div className="price">
                    <div className="oldPrice">
                        ${product.old_price}
                    </div>
                    <div className="newPrice">
                        ${product.new_price}
                    </div>
                </div>
                <div className="desc">
                DISPLAY - 17.13 Centimeters (6.7"Inch) PLS LCD Display, HD+ Resolution with 720 x 1600 Pixels , 260 PPI with 16M Colours and 60Hz Refresh Rate.
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            </div>
        </div>
    )
}

export default Productdetail