import React, { useState, useEffect } from 'react';
import './makebill.css'; // Import the CSS file

const Makebill = () => {
    const [parts, setParts] = useState([]);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/parts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch parts');
                }
                return response.json();
            })
            .then(data => {
                setParts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch parts:', error);
                setError(error.message);
            });
    }, []);

    const addToCart = (partId) => {
        const partToAdd = parts.find(part => part._id.$oid === partId);
        if (!partToAdd) return;

        if (cart[partId]) {
            setCart(prevCart => {
                return {
                    ...prevCart,
                    [partId]: { ...partToAdd, quantity: prevCart[partId].quantity + 1 }
                };
            });
        } else {
            setCart(prevCart => {
                return {
                    ...prevCart,
                    [partId]: { ...partToAdd, quantity: 1 }
                };
            });
        }
    }

    const increaseQuantity = (partId) => {
        const partToAdd = parts.find(part => part._id.$oid === partId);
        if (!partToAdd) return;
    
        if (cart[partId].quantity < partToAdd.quantity) {
            setCart(prevCart => {
                return {
                    ...prevCart,
                    [partId]: { ...prevCart[partId], quantity: prevCart[partId].quantity + 1 }
                };
            });
        } else {
            alert('Cannot add more. Quantity limit reached.');
        }
    };
    
    const decreaseQuantity = (partId) => {
        setCart(prevCart => {
            const newQuantity = prevCart[partId].quantity - 1;
            if (newQuantity <= 0) {
                // Remove item from cart if quantity becomes zero or negative
                const { [partId]: removedItem, ...updatedCart } = prevCart;
                return updatedCart;
            } else {
                return {
                    ...prevCart,
                    [partId]: { ...prevCart[partId], quantity: newQuantity }
                };
            }
        });
    };

    const sendToBackend = () => {
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
        .then(response => {
            if (!response.ok) {
                let errorMessage='';
                errorMessage= response.text();
                throw new Error(errorMessage);
                //throw new Error('Failed to send cart data to backend');
            }
            console.log('Cart data sent successfully');
            // Optionally, reset the cart state after successful submission
            setCart({});
            window.location.reload()
        })
        .catch(error => {
            console.error('Error sending cart data to backend:', error);
            alert("Your cart is empty")
            // Handle error
        });
    };

    if (loading) {
        return (
            <div>
                <center>
                    <h2>Loading...</h2>
                </center>
            </div>
        );
    }

    return (
        <div className="makebill">
            <center>
                <h1>Makebill</h1>
            </center>

            <div className="container">
                <div className="map">
                    {parts.map(part => (
                        <div key={part._id.$oid} className="part-item">
                            <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image" />
                            <div className="part-details">
                                <h3>{part.name}</h3>
                                {/* <p>ID: {part._id.$oid}</p> */}
                                <p>Quantity Left {part.quantity}</p>
                            </div>
                            <div className="part-price">
                                <p>${part.price}</p>
                                <button onClick={() => addToCart(part._id.$oid)} className='blue-button'>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart">
                    <h2>Cart</h2>
                    <div className="cart-items">
                    {Object.keys(cart).length === 0 ? (
    <p>Your cart is empty</p>
) : (
    Object.keys(cart).map(partId => (
        <div key={partId} className="cart-item">
            {/* <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image" /> */}
            <p>{cart[partId].name} - Quantity: {cart[partId].quantity}</p>
            <div className="butts">
            <button onClick={() => increaseQuantity(partId)} className='blue-button butt'>+</button>
            {/* <br /> */}
            {/* <br /> */}
            <button onClick={() => decreaseQuantity(partId)} className='blue-button butt'>-</button>
            </div>
        </div>
    ))
)}
<button onClick={sendToBackend} className='blue-button'>Generate Bill</button>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Makebill;
