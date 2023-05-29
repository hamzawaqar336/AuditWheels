import React, { useEffect, useState } from "react";
import "./Download.css";
import { FaApple, FaWindows } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { IconContext } from "react-icons";
import { Button, Modal } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";


const Download = () => {
  const [subscribe, setSubscribe] = useState('');
  const [modals, setModal] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const handleOk = () => {

    setModal(false)
  };
  const handleCancel = () => {
    setModal(false)
  };
  return (
    <section id="download">
      <div className="container download" data-aos="fade-up">
        <h2>Ask Your Queries!</h2>
        <p className="u-text-small">
          at support@auditwheels.com
        </p>
        <IconContext.Provider value={{ size: "15" }}>
          <div className="download-icons">
            {/* <div> */}
            <input type="text" placeholder="Subscribe Our News Letter!" onChange={(e) => { setSubscribe(e.target.value) }} value={subscribe} className="download-icon" />
           {
            subscribe!==''?
            <Button onClick={() => { setModal(true)}} style={{ fontWeight: 'bold' }}>Subscribe</Button>
            :
            null
           }


          </div>
        </IconContext.Provider>
      </div>
      <Modal title="NewsLetter Subscription" open={modals} onOk={handleOk} onCancel={handleCancel}>
        <p>Congratulations {subscribe} are Successfully Subscribed To Our NewsLetter.</p>


      </Modal>
    </section>
  );
};

export default Download;
