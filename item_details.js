import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const Item_details = () => {
    const [temp, setTemp] = useState(0)
    const {id} = useParams()
    const [part, setPart] = useState(null);
    const history = useHistory()

    useEffect(() => {
        fetch(`/api/parts/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch part');
                }
                return response.json();
            })
            .then(data => setPart(data))
            .catch(error => alert('Failed to fetch part:', error));
    }, [id]);

    if (!part) {
        return <div><center><br /> <h1> Loading....</h1></center></div>;
    }

    const handleClickAdd = () =>{
       if(temp<part.quantity) setTemp(temp+1)
    };

    const handleClickSub = () =>{
        if(temp>=1)  setTemp(temp-1)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/parts/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: temp }),
            });
            if (!response.ok) {
                throw new Error('Failed to update part');
            }
            window.location.reload(); // Reload the page

        } catch (error) {
            console.error('Failed to update part:', error);
        }
    };
    
    const handleRemove = async () => {
        try {
            const response = await fetch(`/api/parts/remove/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to remove part');
            }
            history.push('/inventory');

        } catch (error) {
            console.error('Failed to remove part:', error);
        }
    };
    


    return ( 
        <div className='add_items'>
                <div className="item_details">
                
            <center>
            <h2>{part.name}</h2>
            <div className="add-part-item">
            <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image" />
            <div className="part-details">
  <table>
    <tbody>
      <tr>
        <td>Weight</td>
        <td style={{ paddingLeft: '10px' }}>{part.weight} Kg</td>
      </tr>
      <tr>
        <td>Height</td>
        <td style={{ paddingLeft: '10px' }}>{part.height} cm</td>
      </tr>
      <tr>
        <td>Quantity Left</td>
        <td style={{ paddingLeft: '10px' }}>{part.quantity}</td>
      </tr>
      <tr>
        <td>
            Price
        </td>
        <td style = {{paddingLeft:'10px'}}>₹{part.price}</td>
      </tr>
    </tbody>
  </table>
</div>

            </div>
            <div className="enter">
    <input
        type="number"
        placeholder={`Enter Quantity to add (max 10,000) or remove ${part.quantity}`}
        value={temp === 0 ? '' : temp}
        onChange={(e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value)) {
                value = 0;
            } else if (value < -part.quantity) {
                value = -part.quantity;
            } else if (value > 10000) {
                value = 10000; // Ensure the value is not greater than 10,000
            }
            setTemp(value);
        }}
        min={-part.quantity} // Set the minimum value to negative the quantity of the item
        max={10000} // Set the maximum value to 10,000
    />
</div>

            
            <span className="blue-button" onClick={handleSubmit}>Add</span>
            </center>
            <br />
            {/* <span className="blue-button" onClick={handleRemove}>Remove Item</span> */}
            </div>
        </div>
     );
}
 
export default Item_details;