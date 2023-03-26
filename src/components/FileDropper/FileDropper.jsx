import { Box, Container } from "@mui/material";
import { useState, useRef, useContext } from "react";
// import FileContext from "../Contexts/FileContext";
import { FileContext } from "../../App";
import "./styles.css";
import * as api from "../../api";

const FileDropper = () => {
  const { fileState, setFileState } = useContext(FileContext);

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

      setFileState((prevFileState) => {
        return { ...prevFileState, metadata: metadata, data: data.data };
      });
      // console.log(data);
      // console.log(data.data[0]["Movie Name"]);
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
          <p>Drag and drop your file here or</p>
          <button className="upload-button" onClick={onButtonClick}>
            Upload a file
          </button>
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
  );
};

export default FileDropper;
