import React, { useEffect } from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import "../UI/Button/Button.css";
import phoneHeader from "../../assets/car-png-39069.png";
import { BsMouse } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>Purchase a Vehicle History</span>
            <span>Audit Wheels</span>
            <span>in just $30!</span> 
          </h1>
          <p className="u-text-small">
          By giving precise and comprehensive information on the vehicle, AW history reports serve to protect our customers from fraud and hazardous vehicles.
Always research a car's past before purchasing it!
          </p>
          <div className="header-cta">
            {/* <Button text={"Get Started"} btnClass={"btn-dark"} href={"#"} /> */}
            <Button text={"Our Packages"} btnClass={"btn-light"} href={"#faq"} />
          </div>
        </div>
        <div className="header-right" data-aos="fade-left">
          <img src={phoneHeader} alt="phone" />
        </div>
      </div>
      {/* <div className="floating-icon">
        <a href="#features">
          <BsMouse color="#fff" size={25} className="mouse" />
        </a>
      </div> */}
    </section>
  );
};

export default Header;
