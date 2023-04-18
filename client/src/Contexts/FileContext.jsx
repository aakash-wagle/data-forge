import React, { useState, useContext, createContext } from "react";

export const FileContext = createContext(null);

const initialState = {
  metadata: "",
  data: "",
};

const FileProvider = (props) => {
  const [fileState, setFileState] = useState(initialState);

  return (
    <FileContext.Provider value={{ fileState, setFileState }}>
      {props.children}
    </FileContext.Provider>
  );
};

export default FileProvider;
