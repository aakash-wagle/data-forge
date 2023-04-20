import {apple, flow, google } from "../../assets";
import styles, { layout } from "../../style";

const Documentation = () => (
  <section id="Documentation" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={flow} alt="flow" className="w-[150%] h-[120%] relative z-[5]" style={{ position: 'relative', left: '-50px' }} />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Improve your data <br className="sm:block hidden" /> preprocessing in few <br className="sm:block hidden" /> Easy Steps
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        NO NEED OF PYTHON CODES ANYMORE !!!
        Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio
        aenean neque. Fusce ipsum orci rhoncus aliporttitor integer platea
        placerat.
      </p>

      <div className="flex flex-row flex-wrap sm:mt-10 mt-6">
        <img src={apple} alt="google_play" className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer" />
        <img src={google} alt="google_play" className="w-[144.17px] h-[43.08px] object-contain cursor-pointer" />
      </div>
    </div>
  </section>
);

export default Documentation;