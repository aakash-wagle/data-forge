import { createContext, useState } from "react";
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
import { NavbarNew} from "./components/LandingPage";
import LandingPage from "./components/LandingPage/LandingPage";

export const FileContext = createContext(null);

const initialState = {
  metadata: "",
  data: ""
}

function App(){
  const [fileState,setFileState] = useState(initialState);

  return(
    <div className="App">
      <FileContext.Provider value={{ fileState, setFileState}}>
        <BrowserRouter>        
        <div className="bg-primary w-full overflow-hidden">
          <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
              <NavbarNew />
            </div>
          </div>
          <Routes>
          <Route path="/"element={
              <div>
                <div className={`bg-primary ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <LandingPage />
                  </div>
                </div>
                
                {/* <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Testimonal />
                    <Footer />
                  </div>
                </div> */}
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
        </div>
        </BrowserRouter>
      </FileContext.Provider>
    </div>
  )
}

export default App;
