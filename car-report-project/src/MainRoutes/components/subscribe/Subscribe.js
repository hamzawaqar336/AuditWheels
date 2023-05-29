import React, { useEffect } from "react";
import "../features/Features.css";
import aboutuspic from '../../assets/imagesss-removebg-preview.png'
import { BsFillChatRightQuoteFill } from "react-icons/bs";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

const Subscribe = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="subscribe">
      <div className="container aligns">
        <div className="title" data-aos="fade-left">
          <BsFillChatRightQuoteFill color="orangered" size={30} />
          <h2>About Us!</h2>
          <blockquote className="u-text-small" style={{marginRight:10,fontSize:26}}>
       <span style={{fontSize:35}}> “ </span>  Our goal is to equip millions of Canadians, including people like you, with the knowledge they need to make wiser decisions when purchasing, maintaining, and selling cars.
We develop solutions that draw on billions of data records from countless sources because we think that trust and openness are essential in the automobile sector and can help you feel at ease. We're honoured to be acknowledged as a top employer and company, 
and we're also happy to have our Canadian headquarters in London, Ontario.
          </blockquote>
        </div>
        <div className="title" data-aos="fade-left">
          <img src={aboutuspic}  />
        </div>
        
        </div>
    </section>
  );
};

export default Subscribe;
