import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_pipeline_history } from "../../api";

const PipelineHistory = () => {
  const [pipelineHistory, setpipelineHistory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    console.log(userDetails);
    // console.log(JSON.parse(userDetails));

    // SETUP YOU NEED TO LOGIN HERE

    if (localStorage.getItem("User") === null) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        const response = await get_pipeline_history(userDetails.user.id);
        // if (response.status >= 200 && response.status < 300) {
        //   // setColumnData(result.data);
        //   console.log(typeof response);
        //   console.log(response.data.data);
        //   // setDataExsits(true);
        // } else {
        //   // setDataExsits(false);
        // }
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return <React.Fragment></React.Fragment>;
};

export default PipelineHistory;
