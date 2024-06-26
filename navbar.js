import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {


  return (
    <div className="navbar">

      <div className="navbar_heading">
        <h1>Motor Parts Shop Software</h1>
      </div>

      <div className="links">
        <Link to="/home">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/order">Order</Link>
        <Link to='/contact'>Contact us</Link>
        
      </div>

    </div>
  );
}

export default Navbar;
