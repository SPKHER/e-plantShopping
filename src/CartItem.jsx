import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, decrementItem, addItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  
  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };
  
  const handleIncrement = (item) => {
    dispatch(addItem(item))
  };
  
  const handleDecrement = (item) => {
    dispatch(decrementItem(item))
  };
  
  const handleRemove = (item) => {
    dispatch(removeItem(item))
  };
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0
    cart.forEach(item =>{
        const formattedCost = parseInt(item.cost.replace("$", ""))
        totalCost += formattedCost
    })
    return totalCost 
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const formatttedCost = parseInt(item.cost.replace("$", ""))
    const finalCost = formatttedCost * item.quantity
     return finalCost
  };

  

  return (
    <div className="cart-container" >
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div className='items-main-container'>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: {calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


