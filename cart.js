import React from 'react';

const CartPage = ({ cart, increaseQuantity }) => {
    return (
        <div className="cart-page">
            <h1>Cart</h1>
            <div className="cart-items">
                {Object.keys(cart).map(partId => (
                    <div key={partId} className="cart-item">
                        <img src={`data:image/jpeg;base64,${cart[partId].image}`} alt="Part" className="part-image" />
                        <div className="part-details">
                            <h3>{cart[partId].name}</h3>
                            <p>ID: {partId}</p>
                            <p>Quantity: {cart[partId].quantity}</p>
                            <button onClick={() => increaseQuantity(partId)}>Increase Quantity</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartPage;
