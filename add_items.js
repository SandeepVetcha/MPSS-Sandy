import React, { useState } from "react";
import { useHistory } from "react-router-dom"; 

const Add_items = () => {
    const [name, setName] = useState('')
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState(null)
    const [price, setPrice] = useState(0)
    const [address, setAddress] = useState('')
    const [shelfNumber, setShelfNumber] = useState('0')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory()

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    }

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    }
    
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    const handleShelfChange = (e) => {
        setShelfNumber(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handleImageChange = async(e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        } else {
            console.error('No file selected');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorMessage = '';
        if (!weight  || !height  || !quantity || !price || !name) {
            
            alert('All fields are required'); 
            errorMessage = 'All fields are required';           
            // setErrorMessage('All fields are required');
            return;
        }

        if(shelfNumber <= 0 ) {
            setErrorMessage('Enter correct shelf number')
            errorMessage = 'Enter correct shelf number';
            return
        }

        const formData = new FormData();
        formData.append('name', name)
        formData.append('weight', weight)
        formData.append('height', height)
        formData.append('quantity', quantity)
        formData.append('image', image)
        formData.append('price', price)
        formData.append('shelf_number', shelfNumber)
        formData.append('status',1)
        formData.append('threshold', 0)
        formData.append('address', address)
        formData.append('email', email)

        try {
            const response = await fetch('/api/add_item', {
                method: 'POST',
                body: formData, // Send the form data
            });
            if (!response.ok) {
                errorMessage=await response.text();
                throw new Error("Item already exists");
            }
            history.push('/inventory');
        } catch (error) {
            console.error('Failed to add item:', error);
            alert(error.message)
        }
    };
    
    
    return ( 
        <div className="add_items">
            <p>Add items</p>
            <form onSubmit={handleSubmit}>
                <div className="enter">
                    <p>Part Name</p>
                    <input type = "text" onChange={handleNameChange} />
                </div>

               <div className="enter">
                    <p>Weight</p>
                    <input type="text" step={0.01} placeholder="In Kgs"  onChange={handleWeightChange} />
               </div>
               
               <div className="enter">
                    <p>Height</p>
                    <input type="number" placeholder="In cms" onChange={handleHeightChange} />
               </div>

               <div className="enter">
                    <p>Quantity</p>
                    <input type="number"  onChange={handleQuantityChange} />
               </div>

               <div className="enter">
                <p>Price (₹) </p>
                <input type="number" onChange={handlePriceChange} />
               </div>

               <div className="enter">
                <p>Shelf Number</p>
                <input type="number" onChange={handleShelfChange} />
               </div>

               <div className="enter">
                    <p>Seller Address</p>
                    <input type = "text" onChange={handleAddressChange} />
                </div>
                <div className="enter">
                    <p>Seller E-Mail (example@gmail.com)</p>
                    <input type="email" onChange={handleEmailChange} />
                </div>

               <div className="enter">
                    <p>Image</p>
                    <input type="file" onChange={handleImageChange} />
               </div> 

               <div className="submit">
                    <button type="submit">Submit</button>
               </div>
            </form>
        </div>
    );
};

export default Add_items;