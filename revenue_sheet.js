import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import BarChart from "./graph";
import './revenue_sheet.css'
function Revenue() {

  const [routeSuffix, setRouteSuffix] = useState('')
  
  const [parts, setParts] = useState([])
  const [error,setError] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  
  const [selectedPart, setSelectedPart] = useState(null);
  const [partSelected, setPartSelected] = useState(false);

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
  }, [searchTerm]);

  const [chartData, setChartData] = useState({
    categories: [],
    series: [{ name: "Sales on this day", data: [] }],
  });

  const handleDailyRevenue = async () => {
    const response = await axios.get('http://localhost:5000/revenueday')
  }

  const handleMonthlyRevenue = async () => {
    const response = await axios.get('http://localhost:5000/revenuemonth') 
  }

  const handleSelect = (part) => {
    setSelectedPart(part);
    setPartSelected(true);
  };

  return (
    <div>
      <center>
     {/* <img src="https://em-content.zobj.net/source/telegram/386/chart-increasing_1f4c8.webp" className="img" alt="" /> */}
        <h1 >Get your chart </h1>
      </center>
    <div className="revenue-container">
     <div className="revenue_btns">
     <button onClick={handleDailyRevenue}>Daily Revenue</button>
    <button onClick={handleMonthlyRevenue}>Monthly Revenue</button>

 
     </div>
     <input 
      type="text"
      value={routeSuffix}
      placeholder='Enter product name'
      onChange = {(e) => setRouteSuffix(e.target.value)}/>

      </div>
      {/* <div className="parts-list-revenue">
                {parts.length > 0 ? parts.map((part, index) => (
                    <div key={part._id.$oid} className="part-item-revenue"  onClick={() => handleSelect(part)}>
                       {partSelected && selectedPart && selectedPart._id === part._id && <div className="selected"></div>}
                        <img src={`data:image/jpeg;base64,${part.image}`} alt="Part" className="part-image-revenue" />
                        <div className="part-details">
                            <h3>{index + 1}. {part.name}</h3>                            
                        </div>

                    </div>
                )) : <div className="loading-message">Loading...</div>}
            </div> */}
   {routeSuffix && routeSuffix.trim() !== '' && (
                <div className="chart-container">
                    <BarChart id={routeSuffix} />
                </div>
            )}
    </div>
  );
}

export default Revenue;