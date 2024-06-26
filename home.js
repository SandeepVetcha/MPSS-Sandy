import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
    return ( 
        <div className="home">
            {/* <p>hello</p> */}
            {/* <p>home</p> */}
            <center>

                <h1> <span style={{fontFamily:"serif"}}> Welcome to MotorParts Shop</span></h1> 
            <h2><span style={{fontFamily:"serif"}}>Find all your requirements near us</span></h2> 
             <img className="img" src="https://em-content.zobj.net/source/microsoft-teams/363/mechanic_1f9d1-200d-1f527.png" alt="" />
             {/* <img src="./mech.png" alt="wwo" /> */}
             {/* <span style={{color:"green" , fontFamily:"cursive"} }><h3>Junta Garage </h3>  </span> */}
            <div className="makebill_link">
                <Link to="/makebill">Makebill</Link>
            </div>
            </center>

        </div>
     );
}
 
export default Home;