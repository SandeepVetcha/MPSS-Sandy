import { useState } from "react";
import BarChart from "./graph";

const Statistics = () => {
    const [data, setData] = useState("");
    const [inputValue, setInputValue] = useState("");

    const generate = () => {
        // Use parseInt to convert the input value to a number
        // const number = parseInt(inputValue);
        setData(inputValue);

    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    return ( 
        <div className="statistics">
            <center> 
            <p>stats</p>
            <input
                type="text"
                name="id"
                value={inputValue}
                onChange={handleChange}
                />
            <button onClick={generate}>Generate</button>
            <p>Entered number: {data}</p>
            {data&&   <BarChart dataroute= {`/graph/${data}`}/> }

                </center>
        </div>
    );
}
 
export default Statistics;
