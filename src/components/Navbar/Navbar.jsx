import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import { ButtonGroup } from "@mui/material";
import { LoginModal } from "./Login";
import { useState, useEffect } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("User") === null) {
      setIsUserLoggedIn(false);
    } else {
      setIsUserLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="absolute"
          sx={{ backgroundColor: "rgba(85,167,47, .1)", marginBottom: 3 }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data Forge
            </Typography>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              {isUserLoggedIn ? (
                <Button
                  onClick={() => {
                    localStorage.removeItem("User");
                    window.location.reload();
                  }}
                >
                  <LogoutIcon />
                </Button>
              ) : (
                <Button
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
          </Toolbar>
        </AppBar>
      </Box>

      <LoginModal setOpenLogin={setOpenLogin} openLogin={openLogin} />
    </React.Fragment>
  );
}
