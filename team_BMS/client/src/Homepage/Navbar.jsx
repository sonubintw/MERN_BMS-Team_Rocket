import React from 'react';
import logo from '../Homepage/Images/bookmyshow.png';
import './All.css';


//navbar
function Navbar() {
  return (
    
    <div  >
      <nav className="navbar navbar-light" id='nav' >
         <a className="navbar-brand" href="/">
           <img src={logo} width="400"  className=" align-top" alt="error" />
        </a>
      </nav>

     </div>
  )
}

export default Navbar