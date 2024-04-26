import React from 'react';
import CartItems from '../Components/CartItems/CartItems';
import CheckoutForm from '../Components/CheckoutForm/CheckoutForm';

const Cart = () => {
  return (
    <div>
      <CartItems/>
      <CheckoutForm/>
    </div>
  );
}

export default Cart;