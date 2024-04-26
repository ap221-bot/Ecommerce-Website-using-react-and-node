import React, { useState, useContext  } from 'react';
import './CheckoutForm.css';
import { EContext } from '../../Context/Econtext';

const CheckoutForm = () => {

  // State to manage form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  // Using context to access global state and functions
  const { cartItems, removeFromCart } = useContext(EContext);

  // Handler for input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Reseting form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      creditCardNumber: '',
      expirationDate: '',
      cvv: '',
    });

    // Remove items from cart after placing order
    Object.keys(cartItems).forEach(itemId => {
        if (cartItems[itemId] > 0) {
          removeFromCart(itemId);
        }
    });

    window.alert("Order Placed");
  };

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        <h1>Checkout Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="fields">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} placeholder="Zip Code" required />
            <input type="text" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} placeholder="Credit Card Number" required />
            <input type="text" name="expirationDate" value={formData.expirationDate} onChange={handleChange} placeholder="Expiration Date" required />
            <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="CVV" required />
          </div>
          <button type="submit">Place Order</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;