import { createContext, useState } from "react";
import Dropzone from "./components/Dropzone/Dropzone";
import FileDropper from "./components/FileDropper/FileDropper";
import FileTable from "./components/FileTable/FileTable";
import { Stack } from "@mui/material";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import PipelineBuilder from "./components/Pipeline/PipelineBuilder";
import styles from "./style";
import { Footer, NavbarNew } from "./components/LandingPage";
import LandingPage from "./components/LandingPage/LandingPage";
import FileProvider from "./contexts/FileContext";
import LoginModalProvider from "./contexts/LoginModalContext";
import PipelineHistory from "./components/Pipeline/PipelineHistory";

function App() {
  return (
    <div className="App">
      <FileProvider>
        <LoginModalProvider>
          <BrowserRouter>
            <div className="bg-primary w-full overflow-hidden">
              <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                  <NavbarNew />
                </div>
              </div>
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <div className={`bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <LandingPage />
                        </div>
                      </div>
                    </div>
                  }
                />

                <Route
                  path="/filedropper"
                  element={
                    <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      spacing={5}
                    >
                      <FileDropper />
                      <FileTable />
                      <Footer />
                    </Stack>
                  }
                />
                <Route path="/pipeline" element={<PipelineBuilder />} />
                <Route path="/my-pipelines" element={<PipelineHistory />} />
              </Routes>
            </div>
          </BrowserRouter>
        </LoginModalProvider>
      </FileProvider>
    </div>
  );
}

export default App;
