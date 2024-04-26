import React, { useContext } from 'react';
import './CartItems.css'
import { EContext } from '../../Context/Econtext';
import removeIcon from '../Assets/cart_cross_icon.png';

const CartItems = () => {

    // Using context to access global state and functions
    const {getTotalItemCount,all_product,cartItems,removeFromCart} = useContext(EContext);
    const cartItemTotals = {};
  return (
    <div style={{ marginBottom: '20px' }}>
        <div className="cartItems">
            <div className="main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {all_product.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return <div key={e.id}>
                        <div className="itemsDesign main">
                            <img src={e.image} alt='' className='productIcon' />
                            <p>{e.name}</p>
                            <p>${e.new_price}</p>
                            <button className='quantity'>{cartItems[e.id]}</button>
                            <p>${e.new_price*cartItems[e.id]}</p>
                            <img className="removeIcon" src={removeIcon} onClick={() => {removeFromCart(e.id)}} alt='' />
                        </div>
                        <hr/>
                    </div>
                }
                return null;
            })}
            <div className="bottomSection">
                <div className="total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="totalItem">
                            <p>subTotal</p>
                            <p>${getTotalItemCount()}</p>
                        </div>
                        <hr/>
                        <div className="totalItem">
                            <p>Shipping cost</p>
                            <p>$0</p>
                        </div>
                        <hr/>
                        <div className="totalItem">
                            <h3>Total Cost</h3>
                            <h3>${getTotalItemCount()}</h3>
                        </div>
                        <hr/>
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
}

export default CartItems;