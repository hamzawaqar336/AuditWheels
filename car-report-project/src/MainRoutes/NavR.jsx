import React from "react";
import "./App.css";
import {
  Navbar,
  Header,
  Features,
  Download,
  Subscribe,
  Faq,
  Footer,
} from "./components";



function NavR() {
  return (
    <>
  
      <header className="header-bg">
        <Navbar />
        <Header />
      </header>
      <Subscribe />
      <Features data-aos="fade-up" />
      <Download />
      <Faq />
      <Footer />
     
    
    </>
  );
}

export default NavR;

