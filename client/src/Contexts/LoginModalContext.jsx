import React, { createContext, useState } from "react";

export const LoginModalContext = createContext(null);

const LoginModalProvider = (props) => {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <LoginModalContext.Provider value={{ openLogin, setOpenLogin }}>
      {props.children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalProvider;
