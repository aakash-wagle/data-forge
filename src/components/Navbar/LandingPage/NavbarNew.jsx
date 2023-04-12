import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { close, logo, menu } from "../../../assets";
import { navLinks } from "../../../constants";
import { LoginModal } from "../Login";

const NavbarNew = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let userDetails = localStorage.getItem("User");
    // console.log(JSON.parse(userDetails));
    if (localStorage.getItem("User") === null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} />
      <img src={logo} alt="dataforge" className="w-[200px] h-[42px]" />

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        {isUserLoggedIn ? (
                <React.Fragment>
                  <li
                  key={'mypipelines'}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === "My Pipelines" ? "text-white" : "text-dimWhite"
                  } `}
                  // onClick={() =>  navigate("/mypipeline")}
                  >
                    <a >My Pipelines</a>
                    
                  </li>
                  <li
                  key={'buildpipelines'}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === "Build Pipelines" ? "text-white" : "text-dimWhite"
                  } `}
                  
                  >
                    <a onClick={() =>  navigate("/pipeline")}>Build Pipelines</a>
                  </li>
                  <li
                  key={'logout'}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === "Logout" ? "text-white" : "text-dimWhite"
                  } `}
                  
                  >
                    <a onClick={() => {
                    localStorage.removeItem("User");
                    window.location.reload();
                  }}>Logout</a>
                   
                  </li>
                  
            
                </React.Fragment>
              ) : (
                

                <li
                  key={"login"}
                  className={`font-poppins font-normal cursor-pointer text-[16px] ${
                    active === "Login" ? "text-white" : "text-dimWhite"
                  } `}
                  
                  >
                    <a onClick={() => {
                    setOpenLogin(true);
                  }}>Login</a>
                    
                  </li>
                
              )}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } `}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
                
          </ul>
          {isUserLoggedIn ? (
                <ul>
                  <li
                  key={'mypipelines'}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === "My Pipelines" ? "text-white" : "text-dimWhite"
                  } `}
                  // onClick={() =>  navigate("/mypipeline")}
                  >
                    My Pipelines
                  </li>
                  <li
                  key={'buildpipelines'}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === "Build Pipelines" ? "text-white" : "text-dimWhite"
                  } `}
                  onClick={() =>  navigate("/pipeline")}
                  >
                    Build Pipelines
                  </li>
                  <li
                  key={'logout'}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === "Logout" ? "text-white" : "text-dimWhite"
                  } `}
                  onClick={() => {
                    localStorage.removeItem("User");
                    window.location.reload();
                  }}
                  >
                    Logout
                  </li>
                  
            
                </ul>
              ) : (
                <ul>

                <li
                  key={"login"}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === "Login" ? "text-white" : "text-dimWhite"
                  } `}
                  onClick={() => {
                    setOpenLogin(true);
                  }}
                  >
                    Login
                  </li>
                </ul>
              )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;