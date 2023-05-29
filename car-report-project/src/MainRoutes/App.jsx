import React from "react";
import "./App.css";

import { Route,Routes } from 'react-router-dom'
// import Navbar from "./components/navbar/Navbar";
// import Header from "./components/header/Header";
// import Features from "./components/features/Features";
// import Download from "./components/download/Download";
// import Subscribe from "./components/subscribe/Subscribe";
// import Footer from "./components/footer/Footer";
import CheckoutPage from '../Components/CheckOut/Checkout';
import NavR from "./NavR";
import {
  Navbar,
  Header,
  Features,
  Download,
  Subscribe,
  Faq,
  Footer,
} from "./components";

function App() {
  return (
    <>
{/*   
      <header className="header-bg">
        <Navbar />
        <Header />
      </header>
      <Subscribe />
      <Features data-aos="fade-up" />
      <Download />
      <Faq />
      <Footer /> */}

      <Routes>
      <Route exact path='/' element={<NavR />} /> 
        
        <Route exact path='/checkout' element={<CheckoutPage />} /> 
       

       
        
      </Routes>
     
    </>
  );
}

export default App;

