import React, { useState, useEffect, useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useNavigate } from "react-router-dom";
import { ButtonGroup, Button } from "@mui/material";
import { LoginModal } from "./Login";
import { LoginModalContext } from "../../Contexts/LoginModalContext";

const LoginButton = () => {
  const {openLogin, setOpenLogin} = useContext(LoginModalContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
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
    <React.Fragment>
      <ButtonGroup variant="outlined light" aria-label="outlined button group">
        {isUserLoggedIn ? (
          <div>
            {/* <Button>
              <StickyNote2Icon />
            </Button>
            <Button
              onClick={() => {
                navigate("/pipeline");
              }}
            >
              <ConstructionIcon />
            </Button> */}
            <Button
              onClick={() => {
                localStorage.removeItem("User");
                window.location.reload();
              }}
            >
              <LogoutIcon />
            </Button>
          </div>
        ) : (
          <Button
          style={{ marginLeft: '18px' }}
            onClick={() => {
              setOpenLogin(true);
            }}
          >
            <PersonIcon />
          </Button>
        )}
        {/* <Button>Two</Button>
              <Button>Three</Button> */}
      </ButtonGroup>
      <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} />
    </React.Fragment>
  );
};

export default LoginButton;
