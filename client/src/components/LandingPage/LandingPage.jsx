import Hero from "./Hero.jsx";
import Footer from "./Footer.jsx";
import Stats from "./stats.jsx";
import Testimonal from "./Testimonal.jsx";
import styles from "../../style.js";

import React from 'react'
import Documentation from "./Documentation.jsx";

const LandingPage = () => {
  return (
    <div>
        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Hero />
            </div>
        </div>
                
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Stats />
                <Documentation />
                <Testimonal />
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default LandingPage

