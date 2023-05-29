import React, { useEffect } from "react";
import "./Features.css";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import phoneFeatures from "../../assets/AboutusImage.jpeg";
import Feature from "./Feature";
import Feature2 from "./Feature2";

import Feature3 from "./feature3";
import { FeatureList } from "./data";
import { FeatureList2 } from "./data2";

import { FeatureList3 } from "./data3";

import AOS from "aos";
import "aos/dist/aos.css";

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="features">
      <div className="container features">
        <div className="title" data-aos="fade-up">
          <BsFillBookmarkStarFill color="orangered" size={30} />
          <h2>Why Us!</h2>
          <p className="u-text-small">
            We are the biggest and most trustable Report providers in Canada.
            See Why
          </p>
        </div>
        <div className="features-content">
          {/* <div className="features-left" data-aos="fade-right">
            <img src={phoneFeatures} alt="phone" />
          </div> */}
          <div className="features-right" data-aos="fade-left">
            {FeatureList.map((feature) => (
              <Feature
                key={feature.id}
                icon={feature.icon}
                heading={feature.heading}
                text={feature.text}
              />
            ))}
          </div>
          <div className="features-right" data-aos="fade-left">
            {FeatureList2.map((feature) => (
              <Feature2
                key={feature.id}
                icon={feature.icon}
                heading={feature.heading}
                text={feature.text}
              />
            ))}
          </div>
          <div className="features-right" data-aos="fade-left">
            {FeatureList3.map((feature) => (
              <Feature3
                key={feature.id}
                icon={feature.icon}
                heading={feature.heading}
                text={feature.text}
              />
            ))}
          </div>
         
        </div>
      
      </div>
     
    </section>
  );
};

export default Features;
