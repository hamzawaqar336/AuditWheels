import React,  { useEffect } from "react";
import "./Footer.css";
import TawkTo from 'tawkto-react'
import logo from "../../assets/logo.png";
import exciselogo from '../../assets/excise.jpeg';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
var propertyId = '6426db4531ebfa0fe7f5be33';
var tawkId = '1gsrsh2rf';
const Footer = () => {

  useEffect(() => {
    var tawk = new TawkTo(propertyId, tawkId)

    tawk.onStatusChange((status) => {
        // Tawk_API.toggle()
        console.log(status, 'status_______status')
    })

}, []);

  return (
    <>
    <section id="footer">
      <div className="container footer">
        {/* <div className="footer-box">
          
        <p className="u-text-small">&copy; Copyright 2023. wheelauditcanada.com</p>
          
         
        </div> */}
          <div className="footer-box">
        <h4>Useful Links</h4>
          <div className="footer-links">
          
          <a href="/">&bull; About Us</a>
            <a href="/">&bull; Why Us</a>
            <a href="/">&bull; Contact Us</a>
            <a href="/">&bull; Services</a>
           
          </div>
        </div>
       
      
        <div className="footer-box" >
          
          <h4>Contact Us</h4>
          <div className="footer-contact u-text-small">
            
            <p>
            support@auditwheels.com.
            </p>
          
          </div>
        </div>
    
        <div className="footer-box">
          {/* <img src={logo} alt="logo" /> */}
          {/* <p className="u-text-small">&copy; Copyright 2023. Suad-bharwa.com</p> */}
          <div className="footer-contact u-text-small">
           
           <p>
           Certified By @<strong> NMVTIS</strong>
           </p><br/>
         
         </div>
         <img src={exciselogo} className="imageCheck"  />
        
        </div>
      
      </div>
      
      <div style={{display:"flex",flexDirection:'column',justifyContent:"center",alignItems:"center",marginTop:20}} >

       <hr className="footerCopyLine"/>
       <p className="u-text-small jkk">&copy; Copyright 2023. auditwheels.com</p>
      </div>
    
    </section>
    
     </>
  );
};

export default Footer;

