import React, { useEffect,useState } from "react";
import { questions } from "./data.js";
import { Card } from 'antd';
import Question from "./Question";
import { MdOutlineLibraryBooks } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import "./Faq.css"
import AOS from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  const [ Spackage , setPackage] =  useState(null);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const navigate = useNavigate();
  return (
    <section id="faq">
      <div className="container faq">
        <div className="u-title" data-aos="fade-up">
          <MdOutlineLibraryBooks color="orangered" size={30} />
          <h1 style={{ fontSize: 40 }}>Pricing!</h1>
          <p className="u-text-small">
            Choose any package!
          </p>
        </div>

        <div data-aos="fade-right">

          {/* <Card bordered={false} style={{ width: 400,backgroundColor:"#C5C5C5",borderRadius:30 }}>

            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>

          </Card>

          <Card title="Card title" bordered={false} style={{ marginRight:30,marginLeft:30,width: 400,backgroundColor:"#C5C5C5",borderRadius:30 }}>
          <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>

          </Card>

          <Card title="Card title" bordered={false} style={{ width: 400,backgroundColor:"#C5C5C5",borderRadius:30 }}>
          <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>

          </Card> */}
          <main>
      <div class="card-basic">
        <div class="card-header header-basic">
          <h1>Basic</h1>
        </div>
        <div class="card-body">
          <p><h2> 30 $</h2></p>
          <div class="card-element-hidden-basic">
            <ul class="card-element-container">

          
              <li class="card-element">1 Vehicle Report</li>
              <li class="card-element">Vehicle Specification</li>
              <li class="card-element">DMV Title History</li>
              <li class="card-element">Safety Recall Status</li>
              <li class="card-element">Online Listing History</li>
              <li class="card-element">Junk & Salvage Information</li>
              <li class="card-element">Accident Information</li>




            </ul>
            <button onClick={()=>{localStorage.setItem("PackagePrice",30); navigate("/checkout")}} class="btn btn-basic">Order Now</button>
          </div>
        </div>
      </div>

      <div class="card-standard">
        <div class="card-header header-standard">
          <h1>Silver</h1>
        </div>
        <div class="card-body">
          <p><h2> 40 $</h2></p>
          <div class="card-element-hidden-basic">
            <ul class="card-element-container">
            <li class="card-element">2 Vehicle Report</li>
              <li class="card-element">Vehicle Specification</li>
              <li class="card-element">DMV Title History</li>
              <li class="card-element">Safety Recall Status</li>
              <li class="card-element">Online Listing History</li>
              <li class="card-element">Junk & Salvage Information</li>
              <li class="card-element">Accident Information</li>


            </ul>
            <button onClick={()=>{localStorage.setItem("PackagePrice",40);navigate("/checkout")}} class="btn btn-basic">Order Now</button>
          </div>
        </div>
      </div>

      <div class="card-premium">
        <div class="card-header header-premium">
          <h1>Gold</h1>
        </div>
        <div class="card-body">
          <p><h2> 50 $</h2></p>
          <div class="card-element-hidden-basic">
            <ul class="card-element-container">
            <li class="card-element">4 Vehicle Report</li>
              <li class="card-element">Vehicle Specification</li>
              <li class="card-element">DMV Title History</li>
              <li class="card-element">Safety Recall Status</li>
              <li class="card-element">Online Listing History</li>
              <li class="card-element">Junk & Salvage Information</li>
              <li class="card-element">Accident Information</li>


            </ul>
            <button onClick={()=>{localStorage.setItem("PackagePrice",50);navigate("/checkout")}} class="btn btn-basic">Order Now</button>
          </div>
        </div>
      </div>



    </main>

        </div>

      </div>
    </section>
  );
};

export default Faq;
