import { Box, Container } from "@mui/material";
import { useState, useRef, useContext, useEffect } from "react";
// import FileContext from "../Contexts/FileContext";
import { FileContext } from "../../contexts/FileContext";
import "./styles.css";
import * as api from "../../api";
import {Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../LandingPage";

const FileDropper = () => {
  const { fileState, setFileState } = useContext(FileContext);
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    if (localStorage.getItem("User") === null) {
      navigate("/");
    }
  }, []);

  

  // Sends the file to the backend using axios.
  // Use multipart/FormData to send documents
  const handleFiles = async (fileList) => {
    try {
      const file = fileList.item(0);
      const metadata = { name: file.name, type: file.type };
      const userObj = JSON.parse(localStorage.getItem("User"));
      // console.log(fileList.item(0));

      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.getDatasetHead(userObj.user.id, formData);

      if(data){
        console.log("File uploaded successfully");
        setShowNext(true);
      }
      else{
        console.log("File upload failed");
        showNext(false);
      }

      setFileState((prevFileState) => {
        return { ...prevFileState, metadata: metadata, data: data.data };
      });

      
    } catch (error) {
      console.log(error);
    }
  };

  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <body style={{ backgroundColor: 'background' }}>
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
        {showNext &&
          <div>
            <Button onClick={
              ()=>{
                navigate("/pipeline");
              }
            } style={{marginBottom:"10px"}}>Build Pipeline</Button>
            <Button style={{marginBottom:"10px"}}>Select Existing Pipeline</Button>

          </div> 
          }
        <form
          id="form-file-upload"
          onDragEnter={handleDrag}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            multiple={true}
            onChange={handleChange}
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
          >
            <div>
              <p> <b>
                Drag and drop your file here
              </b> </p> 
              <p style={{ marginTop: "20px", marginBottom: "15px" }}><b>OR</b></p>
              <button className="upload-button" onClick={onButtonClick}><b>
                Upload a file
              </b></button>
            </div>
          </label>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
        </form>
      </div>
      <div>
        <Footer/>
      </div>
    </body>
  );
};

export default FileDropper;
