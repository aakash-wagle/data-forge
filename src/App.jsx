import { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dropzone from "./components/Dropzone/Dropzone";
import FileDropper from "./components/FileDropper/FileDropper";
import FileTable from "./components/FileTable/FileTable";
import { Stack } from "@mui/material";

export const FileContext = createContext(null);

const initialState = {
  metadata: "",
  data: ""
}

function App() {
  const [fileState, setFileState] = useState(initialState);

  return (
    <div className="App">
      <FileContext.Provider value={{ fileState, setFileState }}>
        <Navbar />
        {/* <Dropzone/> */}
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <FileDropper />
          <FileTable />
        </Stack>
      </FileContext.Provider>
    </div>
  );
}

export default App;
