import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { close, logo, menu } from "../../assets";
import { navLinks } from "../../constants";
import { LoginModal } from "./Login";
import LoginButton from "./LoginButton";

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

        {isUserLoggedIn && (
          <React.Fragment>
            <li
              key={"mypipelines"}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === "My Pipelines" ? "text-white" : "text-dimWhite"
              } `}
              // onClick={() =>  navigate("/mypipeline")}
              style={{ marginLeft: "35px", marginRight: "15px" }}
            >
              <a onClick={() => navigate("/my-pipelines")}>My Pipelines</a>
            </li>
            <li
              key={"buildpipelines"}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === "Build Pipelines" ? "text-white" : "text-dimWhite"
              } `}
              style={{ marginLeft: "15px", marginRight: "20px" }}
            >
              <a onClick={() => navigate("/pipeline")}>Build Pipelines</a>
            </li>
          </React.Fragment>
        )}
        <LoginButton />
        {/* <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} /> */}
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
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;
