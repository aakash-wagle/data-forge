/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { get_cols_info } from "../../api";
import React from "react";
import {
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import { Form } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom/dist";
import { Modal, Box } from "@mui/material";
import style from "./Pipeline.module.css";
import Footer from "../LandingPage/Footer";
import { API } from "../../api";
import { operations, opsRoutes } from "../../constants";


// import Button from './../Navbar/LandingPage/Button';

const PipelineBuilder = () => {
  const [pipeline, setPipeline] = useState([]);
  const [columnData, setColumnData] = useState({});

  const [selectedOp, setselectedOp] = useState("");
  const [input0, setinput0] = useState("");
  const [input1, setinput1] = useState("");

  const [dataExsits, setDataExsits] = useState(false);

  const navigate = useNavigate();

  const [pipelineName, setPipelineName] = useState("");
  const [showPipelineName, setShowPipelineName] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    console.log(userDetails);
    // console.log(JSON.parse(userDetails));
    if (localStorage.getItem("User") === null) {
      navigate("/");
    }

    const fetchData = async () => {
      const response = await get_cols_info(userDetails.user.id);
      const result = await response;
      if (result.status >= 200 && result.status < 300) {
        setColumnData(result.data);
        setDataExsits(true);
      }
      else {
        setDataExsits(false);
      }
    };
    fetchData();

    //   let cols =  get_cols_info(userDetails.user.id);
  }, []);

  // const operations = {
  //   "Rename Column": {
  //     "Old Name": ["any", "drop"],
  //     "New Name": ["object", "text"],
  //   },
  //   "Drop Column": { "Column Name": ["any", "drop"] },
  //   "Fill Empty Cells": {
  //     "Column Name": ["any", "drop"],
  //     "Replace term": ["object", "text"],
  //   },
  //   "Drop Empty Cells": { "Column Name": ["any", "drop"] },
  //   // "One Hot Encoding": {
  //   //   "Column Names separaed by commas": ["object", "mult"],
  //   // },
  //   Tokenize: { "Column Name": ["object", "drop"] },
  //   "Remove Stopwords": { "Column Name": ["object", "drop"] },
  // };

  // const opsRoutes = {
  //   "Rename Column": "rename_columns",
  //   "Drop Column": "drop_columns",
  //   "Fill Empty Cells": "fill_nan",
  //   "Drop Empty Cells": "drop_nan",
  //   "One Hot Encoding": "one_hot_encoding",
  //   "Tokenize": "tokenize",
  //   "Remove Stopwords": "remove_stopwords",
  // };

  const exitHandler = () => {
    setPipeline([]);
    setColumnData({});
    setinput0("");
    setinput1("");
    setselectedOp("");
    navigate("/");
  };

  const addLayerHandler = async () => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    const resp = await API.get(
      `/${opsRoutes[selectedOp]}/${userDetails.user.id}/${input0}/${input1}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.status >= 200 && resp.status < 300) {
      const obj = [selectedOp, input0, input1];
      setPipeline((prev) => {
        return [...prev, obj];
      });
      setselectedOp("");
      setinput0("");
      setinput1("");
      document.getElementById("error").innerText = "";
    } else {
      document.getElementById("error").innerText = resp.message;
    }
  };
  
  const downloadFile = (resp) => {
    
    const blob = new Blob([resp], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);  
    }, 0);
  }



  const finishHandler = async () => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    const resp = await API.post(
      `/upload-pipeline/${userDetails.user.id}`,
      {
        pipeline_name: pipelineName,
        pipeline: pipeline,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.status >= 200 && resp.status < 300) {
      setPipeline([]);
      setselectedOp("");
      setinput0("");
      setinput1("");
      document.getElementById("error_modal").innerText = "";

      const id = userDetails.user.id;
      const resp2 = await API.get(`/download_data/${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (resp2.status >= 200 && resp2.status < 300) {
        console.log("download should start", resp2.data); 
        
        downloadFile(resp2.data)
        navigate("/");
      }
      else{
        console.log("download failed");
      }


    } else {
      document.getElementById("error_modal").innerText = resp.message;
    }
  };
  
  // console.log(Object.keys(operations));
  // console.log(columnData)
  return (
    <React.Fragment>
      
      <Modal
        /* eslint-disable react/prop-types */
        open={showPipelineName}
        onClose={() => {
          setShowPipelineName(false);
        }}
        // open={setOpen(true)}
        // onClose={setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.box}>
          <span id="error_modal"></span>
          <div className={style.formContainer}>
            <div className={style.pipelineForm}>
              <TextField
                id="pipelineName"
                label="Pipeline Name"
                name="pipelineName"
                value={pipelineName}
                onChange={(event) => {
                  setPipelineName(event.target.value);
                }}
              />

              <Button
                onClick={() => {
                  finishHandler();
                }}
                variant="contained"
                color="primary"
              >
                Save & Download
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {dataExsits ? (

        <div className={style.builderFormContainer}>
          <FormControl className={style.builderForm}>
            <span className={style.error} id="error"></span>
            <InputLabel id="selectops">Select Operation</InputLabel>
            <Select
              labelId="selectops"
              id="selectops"
              value={selectedOp}
              onChange={(event) => setselectedOp(event.target.value)}
              className={style.selectOps}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Object.keys(operations).map((key) => {
                return (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {selectedOp !== "" && (
            <FormControl>
              {Object.keys(operations[selectedOp]).map((field, index) => {
                if (operations[selectedOp][field][1] == "drop") {
                  return (
                    <div>
                      <InputLabel id={`dropdown-label${index}`}>
                        {field}
                      </InputLabel>
                      <Select
                        labelId={`dropdown-label${index}`}
                        id={`dropdown${index}`}
                        value={index == 0 ? input0 : input1}
                        key={`dropdown${index}`}
                        className={style.selectOps}
                        onChange={(event) => {
                          index == 0
                            ? setinput0(event.target.value)
                            : setinput1(event.target.value);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {columnData.map((obj) => {
                          // console.log(obj);
                          if (operations[selectedOp][field][0] == "any") {
                            return (
                              <MenuItem
                                key={obj["column_name"]}
                                value={obj["column_name"]}
                              >
                                {obj["column_name"]}
                              </MenuItem>
                            );
                          } else {
                            if (
                              obj["data_type"] == operations[selectedOp][field][0]
                            ) {
                              return (
                                <MenuItem
                                  key={obj["column_name"]}
                                  value={obj["column_name"]}
                                >
                                  {obj["column_name"]}
                                </MenuItem>
                              );
                            }
                          }
                        })}
                      </Select>
                    </div>
                  );
                }
                if (operations[selectedOp][field][1] == "text") {
                  return (
                    <div>
                      <TextField
                        label={field}
                        id={field}
                        value={index == 0 ? input0 : input1}
                        key={index}
                        className={style.selectOps}
                        style={{ marginLeft: "15px" }}
                        onChange={(event) => {
                          index == 0
                            ? setinput0(event.target.value)
                            : setinput1(event.target.value);
                        }}
                      />
                    </div>
                  );
                }
              })}
              <Button
                onClick={() => {
                  exitHandler();
                }}
              >
                Exit
              </Button>
              <Button
                onClick={() => {
                  addLayerHandler();
                }}
              >
                Add layer
              </Button>
            </FormControl>
          )}
        {pipeline != [] && (
          <Button
            onClick={() => {
              setShowPipelineName(true);
            }}
          >
            Finish
          </Button>
        )}
        </div>
      ):(<Button onClick={()=>{
        navigate("/filedropper");
      }}>Upload Data</Button>)}
      <div className={style.layerTable}>
        <h3>Layers</h3>
        <ol>
          {pipeline.map((process, index) => {
            console.log(pipeline);
            return <li key={index}>{index+1}. {process[0]}</li>;
          })}
        </ol>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default PipelineBuilder;
