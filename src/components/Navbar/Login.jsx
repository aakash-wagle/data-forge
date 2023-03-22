import { useState } from "react";
import { Fragment } from "react";
import { Modal, Box } from "@mui/material";
import style from "./Login.module.css";
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { display } from "@mui/system";
import * as api from "../../api";

export const LoginModal = (props) => {
  const [loginForm, setLoginForm] = useState({
    loginemail: "",
    loginpassword: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [login, setLogin] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "loginemail" || name === "loginpassword") {
      setLoginForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setSignupForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.login({
        email: loginForm.loginemail,
        password: loginForm.loginpassword,
      });
      console.log(res);
      // Handle successful login
      const userObj = {
        token: res.token,
        user: res.user,
      };
      localStorage.setItem("User", userObj);
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.register({
        username: signupForm.username,
        email: signupForm.email,
        password: signupForm.password,
      });
      console.log(res);
      // Handle successful signup
      if (res.status == 200) {
        const userObj = {
          token: res.token,
          user: res,
          // user, 
        };
        localStorage.setItem("User", userObj);
      }

    } catch (error) {
      // Handle signup error
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Modal
      /* eslint-disable react/prop-types */
        open={props.openLogin}
        onClose={() => {
          props.setOpenLogin(false);
        }}
        // open={setOpen(true)}
        // onClose={setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.box}>
          <div className={style.selectionContainer}>
            <div className={style.selection}>
              <Button
                onClick={() => {
                  setLogin(true);
                }}
                style={{ fontWeight: login ? "bold" : "normal" }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setLogin(false);
                }}
                style={{ fontWeight: !login ? "bold" : "normal" }}
              >
                Sign Up
              </Button>
            </div>
            {login ? (
              <div className={style.loginForm}>
                <form
                  className={style.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleLoginSubmit}
                >
                  <TextField
                    id="loginemail"
                    label="Email"
                    name="loginemail"
                    value={loginForm.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="loginpassword"
                    label="Password"
                    name="loginpassword"
                    type="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </form>
              </div>
            ) : (
              <div className={style.signupForm}>
                <form
                  className={style.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSignupSubmit}
                >
                  <TextField
                    id="username"
                    label="Username"
                    name="username"
                    value={signupForm.username}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={signupForm.password}
                    onChange={handleInputChange}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Sign up
                  </Button>
                </form>
              </div>
            )}
          </div>
          <Button>Google login</Button>
        </Box>
      </Modal>
    </Fragment>
  );
};
