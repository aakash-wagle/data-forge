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
import styles from "./style";
import { Footer, Stats, Testimonal, Hero, NavbarNew} from "./components/Navbar/LandingPage";

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
        <BrowserRouter>
        {/* <Navbar /> */}
        <NavbarNew />
          <Routes>
            <Route path="/"element={
              <div>
                <div className={`bg-primary ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Hero />
                  </div>
                </div>
                
                <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Testimonal />
                    <Footer />
                  </div>
                </div>
              </div>

            }/>

           
            <Route path="/filedropper" element={

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
