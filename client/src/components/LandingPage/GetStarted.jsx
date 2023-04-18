import styles from "../../style";
import { arrowUp } from "../../assets";
import React, { useContext, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LoginModalContext } from "../../Contexts/LoginModalContext";
import { Button } from "@mui/material";
import { LoginModal } from "../Navbar/Login";

function GetStarted() {
  const getSectionRef = useRef(null);

  const handleClick = () => {
    getSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { openLogin, setOpenLogin } = useContext(LoginModalContext);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Button
        // component={Link}
        // to={localStorage.getItem("User") ? "/filedropper" : "/"}
        variant="elevated"
        color="primary"
        onClick={() => {
          if (localStorage.getItem("User")) {
            navigate("/filedropper");
          } else {
            setOpenLogin(true);
          }
        }}
      >
        <div
          className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer`}
        >
          <div
            className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}
          >
            <div className={`${styles.flexStart} flex-row`}>
              <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
                <span className="text-gradient">Get</span>
              </p>
              {/* <a href={localStorage.getItem("User") ? "/filedropper" : "/auth"}> */}
                <img
                  src={arrowUp}
                  alt="arrow-up"
                  className="w-[23px] h-[23px] object-contain"
                  onClick={handleClick}
                  id="get"
                  ref={getSectionRef}
                />
              {/* </a> */}
            </div>
            <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
              <span className="text-gradient">Started</span>
            </p>
          </div>
        </div>
      </Button>
      <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} />
    </React.Fragment>
  );
}

export default GetStarted;
