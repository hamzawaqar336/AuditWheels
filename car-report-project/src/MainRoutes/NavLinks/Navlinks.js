import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from '../../Components/homePage/Home'
import Checkout from '../../Components/CheckOut/Checkout'

import Navbar from '../AppNavbar/Navbar'
const Navlinks = () => {
  return (
    <div>
       <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} /> 
        <Route exact path='/checkoutPage' element={<Checkout/>} /> 
        
       
        
      </Routes>
 
    </div>
  )
}

export default Navlinks
