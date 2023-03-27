import { useState, useEffect } from "react";
import { get_cols_info } from "../../api";
import React from "react";
import { Button,FormControl,Select,InputLabel,MenuItem, TextField } from "@mui/material";
import { Form } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom/dist";
import { API } from "../../api";


const PipelineBuilder = ()=>{

    const [pipeline, setPipeline] = useState([]);
    const [columnData, setColumnData] = useState({});

    const [selectedOp, setselectedOp] = useState("");
    const [input0, setinput0] = useState("");
    const [input1, setinput1] = useState("");

    const navigate = useNavigate();
  

    useEffect(() => {
      const userDetails = JSON.parse(localStorage.getItem("User"));
      console.log(userDetails);
        // console.log(JSON.parse(userDetails));
        if (localStorage.getItem("User") === null) {
            navigate("/")
        } 

      const fetchData = async () => {
        const response = await get_cols_info(userDetails.user.id);
        const result = await response;
        setColumnData(result.data);  
      };
      fetchData();

    //   let cols =  get_cols_info(userDetails.user.id);
      
    }, [])
    
    const operations ={
        "Rename Column": {"Old Name":["any","drop"], "New Name":["object","text"]},
        "Drop Column": {"Column Name":["any","drop"]},
        "Fill Empty Cells": {"Column Name":["any","drop"],"Replace term":["object","text"]},
        "Drop Empty Cells":{"Column Name":["any","drop"]},
        "One Hot Encoding":{"Column Names separaed by commas":["object","mult"]},
        "Tokenize":{"Column Name":["object","drop"]},
        "Remove Stopwords":{"Column Name":["object","drop"]}
    }

    const opsRoutes = {
        "Rename Column": "rename_colums",
        "Drop Column": "drop_columns",
        "Fill Empty Cells": "fill_nan",
        "Drop Empty Cells":"drop_nan",
        "One Hot Encoding":"one_hot_encoding",
        "Tokenize":"tokenize",
        "Remove Stopwords":"remove_stopwords"
    }

    const exitHandler = ()=>{
        setPipeline([]);
        setColumnData({});
        setinput0("");
        setinput1("");
        setselectedOp("");
        navigate("/");

    }

    const addLayerHandler = ()=>{
        const userDetails = JSON.parse(localStorage.getItem("User"));
        res = API.get(`/${userDetails.user.id}/${opsRoutes[selectedOp]}/${input0}/${input1}`, {
            headers: { "Content-Type": "application/json" },
          }).then(
            (resp)=>{
                if(resp.status>=200 && resp.status<300){
                    const obj = [selectedOp, input0,input1]
                    setPipeline((prev)=>{
                        return [ ...prev, obj]
                    })
                    setselectedOp("")
                }
                else{
                    document.getElementById('error').innerText = resp.message;
                }
            }
        )
    }
    
    const finishHandler = ()=>{

    }
    // console.log(Object.keys(operations));
    // console.log(columnData)
    return(
        <React.Fragment>
            <div>
               <span id="error"></span>
                <FormControl >
                    <InputLabel id="selectops">Select Operation</InputLabel>
                    <Select
                    labelId="selectops"
                    id="selectops"
                    value={selectedOp}
                    onChange={(event) => setselectedOp(event.target.value)}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {
                        Object.keys(operations).map((key)=>{
                            return(
                                <MenuItem key={key} value={key}>{key}</MenuItem>
                            )
                        }
                        )
                    }

                    </Select>
                </FormControl>
                {selectedOp!=="" &&
                <FormControl>
                    {Object.keys(operations[selectedOp]).map((field, index)=>{
                        if (operations[selectedOp][field][1]=="drop") {
                            return(
                                <div>

                                    <InputLabel id={`dropdown-label${index}`}>{field}</InputLabel>
                                    <Select
                                    labelId={`dropdown-label${index}`}
                                    id={`dropdown${index}`}
                                    value={index==0? input0:input1}
                                    key = {`dropdown${index}`}
                                    onChange={(event) => {
                                        index==0? 
                                        setinput0(event.target.value):
                                        setinput1(event.target.value)

                                    }}
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        columnData.map((obj)=>{
                                            // console.log(obj);
                                            if(operations[selectedOp][field][0]=="any"){

                                                return(
                                                    <MenuItem key={obj["column_name"]} value={obj["column_name"]}>{obj["column_name"]}</MenuItem>
                                                )
                                            }
                                            else{

                                                if(obj["data_type"]==operations[selectedOp][field][0]){
                                                    return(
                                                        <MenuItem key={obj["column_name"]} value={obj["column_name"]}>{obj["column_name"]}</MenuItem>
                                                    )
                                                }
                                            }
                                        }
                                        )
                                    }

                                    </Select>
                                </div>
                            );
                        }
                        if (operations[selectedOp][field][1]=="text") {
                            return(
                                <div>

                            
                                    <TextField
                                    label={field}
                                    id={field}
                                    value={index==0? input0:input1}
                                    key = {index}
                                    onChange={(event) => {
                                        index==0? 
                                        setinput0(event.target.value):
                                        setinput1(event.target.value)
                                    }}
                                    />

                                </div>
                            );
                        }
                        
                        })
                    }
                <Button onClick={()=>{
                    exitHandler();
                }}>Exit</Button>
                <Button onClick = {()=>{
                    addLayerHandler();
                }}>Add layer</Button>
                <Button onClick={()=>{
                    finishHandler();
                }}>Finish</Button>
                </FormControl>
                }

            </div>
            <div>
                <h3>Layers</h3>
                {
                    Object.keys(pipeline).map((process, index)=>{
                        <ol>
                            <li>{process}</li>
                        </ol>
                    })
                }
            </div>

        </React.Fragment>
    );


}

export default PipelineBuilder;