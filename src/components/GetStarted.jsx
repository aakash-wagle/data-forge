import styles from "../style";
import { arrowUp } from "../assets";
import React, { useRef } from 'react';
import Get from "./Get/Get";

function GetStarted(){
  const getSectionRef = useRef(null);

  const handleClick = () => {
    getSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return(
    <div className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}>
      <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
            <span className="text-gradient">Get</span>
          </p>
          <a href = "#Get">
            <img src={arrowUp} alt="arrow-up" className="w-[23px] h-[23px] object-contain" onClick={handleClick} section id="get" ref={getSectionRef}/>
          </a>
        </div>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;