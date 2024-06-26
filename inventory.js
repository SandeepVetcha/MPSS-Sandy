import React, {useState, useEffect} from 'react'
import { useHistory , Link} from "react-router-dom"
import axios from 'axios'
import './inventory.css'
const Inventory = () => {

    const [parts, setParts] = useState([])
    const [error,setError] = useState(null)
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState('')

    const handleClick = () =>{
        history.push('/add_items')
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/search?query=${searchTerm}`);
            setParts(response.data.map((part, index) => ({ ...part, index: index + 1 })));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fetchParts = async () => {
            try {
                const response = await fetch('/api/parts');
                if (!response.ok) {
                    throw new Error('Failed to fetch parts');
                }
                const data = await response.json();
                setParts(data.map((part, index) => ({ ...part, index: index + 1 }))); // Add an index to each part
            } catch (error) {
                console.error('Failed to fetch parts:', error);
                setError(error.message);
            }
        };
        fetchParts();
    }, []);

    if(error) return <div>Error : { error }</div>

    const handleRemove = async (id) => {
        const confirmed = window.confirm('Are you sure you want to remove this item?');
        if (!confirmed) {
           // return; // Do nothing if user clicks "No" or cancels
           alert('not removing item');

           // Redirect to the inventory page after a short delay
           
           setTimeout(() => {
            history.push('/inventory');
        }, 1); // Redirect after 1 second (adjust timing as needed)
 
            
        }
    
        else {try {
            const response = await fetch(`/api/parts/remove/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove part');
            }
            // Filter out the removed part from the parts state
            setParts(parts.filter(part => part._id.$oid !== id));
            // Show success message
        alert('Item removed successfully');

        // Redirect to the inventory page after a short delay
        setTimeout(() => {
            history.push('/inventory');
        }, 1000); // Redirect after 1 second (adjust timing as needed)

        } catch (error) {
            console.error('Failed to remove part:', error);
        }}
    };
     

    return ( 
        <div className="inventory">
            <div className="search-bar">
                <input 
                    type="text"
                    placeholder='Search'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="parts-list">
                {parts.length > 0 ? parts.map((part, index) => (
                    <div key={part._id.$oid} className="part-item">
                        <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image" />
                        <div className="part-details">
                            <h3>{index + 1}. {part.name}</h3>
                            <p>Weight  : {part.weight} Kg </p>
                            <p>Quantity Left : {part.quantity}</p>
                            <p>Address of the Vendor : {part.address}</p>
                         </div>
                         <div className="part-price">
                            <p>₹{part.price}</p>
                            <button onClick={() => handleRemove(part._id.$oid)}>Remove Item</button>
         <Link to={`/inventory/${part._id.$oid}`} key={part._id.$oid}>
                        <p> <span className='blue-button'>Modify</span>  </p>
                    </Link>
                         </div>
                    </div>
                )) : <div className="loading-message"><center><br /><h2> Loading...</h2></center></div>}
            </div>
            <div className="add-item-section">
                <p>Want to add some items into your inventory?</p>
                <button onClick={handleClick}>Click Here</button>
            </div>
        </div>
    );
}
 
export default Inventory;