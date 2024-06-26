import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useHistory } from 'react-router-dom'

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
            const response = await fetch('/api/search?query=${searchTerm}')
            if(!response.ok){
                throw new Error ('Failed to fetch the parts')
            }

            const data = await response.json()
            setParts(data.map((part, index) => ({ ...part, index: index + 1 })))
        }catch (error){
            console.error("Failed to fetch parts", error)
            setError(error.message)
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

    return ( 
        <div className="inventory">
            <center>
                <input 
                    type="text"
                    placeholder='Search'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </center>
            <div className="parts-list">
                {parts.map((part, index) => (
                    <div key={part._id} className="part-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        {/* Display the image */}
                        <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                        {/* Display the name and other details */}
                        <div style={{ flexGrow: 1 }}>
                            <h3 style={{ margin: 0 }}>{index}. {part.name}</h3> {/* Assuming 'name' is a property */}
                            <p>ID: {part._id}</p>
                            <p>Quantity: {part.quantity}</p>
                        </div>
                        {/* Display the price */}
                        <div style={{ width: '100px', textAlign: 'center' }}>
                            <p>${part.price}</p> {/* Assuming 'price' is a property */}
                        </div>
                    </div>
                ))}
            </div>
            <div className="add_item">
                <p>Want to add some items into your inventory?</p>
                <button onClick={handleClick}>Click Here</button>
            </div>
        </div>
     );
}
 
export default Inventory;