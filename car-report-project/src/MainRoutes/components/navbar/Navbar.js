import React, { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { SiAnaconda } from "react-icons/si";
import Button from "../UI/Button/Button";
import LogoMain from '../../assets/headerlogo.png'
import "../UI/Button/Button.css";

import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className={showMenu ? '':"parent"}>

    
    <nav className="navbar container">
      <div className="logo">
        {/* <SiAnaconda color="#fff" size={33} /> */}
        <img className="logocll" src={LogoMain} width={150} height={155}  />
        <p className="logo-text">
          Audit<span>Wheels</span>
        </p>
      </div>
      <menu>
        <ul
          className="nav-links"
          id={showMenu ? "nav-links-mobile" : "nav-links-mobile-hide"}
        >
          <li>
            <a href="#subscribe">About Us</a>
          </li>
          <li>
            <a href="#features">Why Us</a>
          </li>
          <li>
            <a href="#download">Contact Us</a>
          </li>
          <li>
            <a href="#faq">Services</a>
          </li>

          {/* <li>
            <a href="#" className="btn btn-dark">
              Get Started
            </a>
          </li> */}
          {/* <li className="nav-btn">
            <Button text={"Learn More"} btnClass={"btn-dark"} href={"#faq"} />
          </li> */}
        </ul>
      </menu>
      <div className="menu-icons" onClick={toggleMenu}>
        {showMenu ? (
          <RiCloseLine color="#fff" size={30} />
        ) : (
          <AiOutlineBars color="#fff" size={27} />
          
        )}
      </div>
    </nav>
    </div>
  
  );
};

export default Navbar;




