import { useState } from "react";
import { Fragment } from "react";
import { Modal, Box, Tab, Tabs } from "@mui/material";
import style from "./Login.module.css";
// import { makeStyles } from '@material-ui/core/styles';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { display } from "@mui/system";
import * as api from "../../api";
import GoogleButton from "./GoogleButton";

export const LoginModal = (props) => {
  const [loginForm, setLoginForm] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLogin, setiSLogin] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "loginEmail" || name === "loginPassword") {
      setLoginForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setSignupForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.login({
        email: loginForm.loginEmail,
        password: loginForm.loginPassword,
      });
      // Handle successful login
      const userObj = {
        token: res.data.token,
        user: res.data.user,
      };
      localStorage.setItem("User", JSON.stringify(userObj));
      window.location.reload();
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
        window.location.reload();
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
          <div className={style.Container}>
            {/* <div className={style.selection}> */}
            <Tabs variant="fullWidth" value={isLogin ? 0 : 1} onChange={(event, newValue) => {
                setiSLogin( newValue == 0 ? 1 : 0);
              }}
            >
              <Tab label="Login" value={0} style={{ color: 'black', fontSize: "20px"}}/>
              <Tab label="Sign Up" value={1} style={{ color: 'black', fontSize: "20px"}}/>
            </Tabs>
              {/* <Button
                onClick={() => {
                  setiSLogin(true);
                }}
                style={{ fontWeight: login ? "bold" : "normal", color:"Background", marginTop: "7px", fontSize: "20px" }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  setiSLogin(false);
                }}
                style={{ fontWeight: !login ? "bold" : "normal", color:"Background", marginTop: "7px", fontSize: "20px"}}
              >
                Sign Up
              </Button> */}
            {/* </div> */}
            {isLogin ? (
              <div className={style.loginForm}>
                <form
                  method="post"
                  className={style.form}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleLoginSubmit}
                >
                  <TextField
                    id="loginEmail"
                    label="Email"
                    name="loginEmail"
                    value={loginForm.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="loginPassword"
                    label="Password"
                    name="loginPassword"
                    type="password"
                    value={loginForm.password}
                    onChange={handleInputChange}
                  />
                  <Button type="submit" variant="contained" color="primary" style={{ color: "ButtonFace"}} className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}>
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

                  <Button type="submit" variant="contained" color="primary" style={{ color: "black"}} className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}>
                    Sign up
                  </Button>
                </form>
              </div>
            )}
          </div>
          <div className={style.Container}>
            <p style={{textAlign: "center", color: "Background", marginBottom: "20px"}}>OR</p>
            <GoogleButton isLogin={isLogin}/>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
};