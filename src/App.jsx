import { createContext, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Dropzone from "./components/Dropzone/Dropzone";
import FileDropper from "./components/FileDropper/FileDropper";
import FileTable from "./components/FileTable/FileTable";
import { Stack } from "@mui/material";
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";
import PipelineBuilder from "./components/Pipeline/PipelineBuilder";

export const FileContext = createContext(null);

function App() {
  const [fileState, setFileState] = useState("");

  return (
    <div className="App">
      <FileContext.Provider value={{ fileState, setFileState }}>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={

              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5}
              >
                <FileDropper />
                <FileTable />
              </Stack>
            }/>
            <Route path="/pipeline" element={<PipelineBuilder/>}/>
              
        
     
          </Routes>

        </BrowserRouter>
        
      </FileContext.Provider>
    </div>
  );
}

export default App;
