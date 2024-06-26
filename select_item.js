import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

const Select_item = () => {
    const [temp, settemp] = useState(0)
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
            .catch(error => console.error('Failed to fetch part:', error));
    }, [id]);


    if (!part) {
        return <div> <center><br /><br /> <h4>  Loading . . . . .</h4></center></div>;
    }

    const handleClickAdd = () =>{
       if(temp<part.quantity) settemp(temp+1)
    };

    const handleClickSub = () =>{
        if(temp>0)  settemp(temp-1)
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/sales/${id}`, {
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


    

    return ( 
        <div className="center-screen">
    <div className="add_items">
            <div className="add-part-item">
                    <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image" />
        <div className="item_details">

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

        </div>
        <div className="enter">

        <input
    type="number"
    placeholder={`max of ${part.quantity}`}
    value={temp === 0 ? '' : temp}
    onChange={(e) => {
        const value = parseInt(e.target.value);
        settemp(isNaN(value) ? 0 : Math.min(value,part.quantity)); // Ensure the value is not greater than 10,000
    }}
    max={part.quantity} // Set the maximum value
/>
    </div>
    

     <span className="blue-button" onClick={handleSubmit}>Sell </span>
    
        </div>

</div>

     );
}
 
export default Select_item;