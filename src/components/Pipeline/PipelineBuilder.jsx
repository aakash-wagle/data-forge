import { useState, useEffect } from "react";
import { get_cols_info } from "../../api";
import React from "react";
import { Button,FormControl,Select,InputLabel,MenuItem, TextField } from "@mui/material";
import { Form } from "react-router-dom/dist";
import { useNavigate } from "react-router-dom/dist";


const PipelineBuilder = ()=>{

    const [pipeline, setPipeline] = useState({});
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
        "Rename Column": {"Old Name":["string","drop"], "New Name":["string","text"]},
        "Drop Column": {"Column Name":["string","drop"]},
        "Fill Empty Cells": {"Column Name":["string","drop"],"Replace term":["string","text"]},
        "Drop Empty Cells":{"Column Name":["string","drop"]},
        "One Hot Encoding":{"Column Names separaed by commas":["string","mult"]},
        "Tokenize":{"Column Name":["string","drop"]},
        "Remove Stopwords":{"Column Name":["string","drop"]}
    }
    
    // console.log(Object.keys(operations));
    // console.log(columnData)
    return(
        <React.Fragment>
            <div>
               
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
                                            if(obj["data_type"]==operations[selectedOp][field][0]){
                                                return(
                                                    <MenuItem key={obj["Column_name"]} value={obj["Column_name"]}>{obj["Column_name"]}</MenuItem>
                                                )
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
                                    key = {field}
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
                <Button>Exit</Button>
                <Button>Add layer</Button>
                <Button>Finish</Button>
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