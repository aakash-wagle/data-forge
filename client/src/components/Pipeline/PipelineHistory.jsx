import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_pipeline_history } from "../../api";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { blueGrey } from "@mui/material/colors";
import ConstructionIcon from "@mui/icons-material/Construction";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PipelineHistory = () => {
  // Array of pipeline objects.
  // Pipeline object: {
  //   name: "Pipeline Name",
  //   operations: [
  //     {
  //       opName: "Operation Name"
  //       values: [column name(s) on which the operation was carried out]
  //     },...
  //   ]
  // }
  const [pipelineHistory, setpipelineHistory] = useState([]);
  const navigate = useNavigate();

  // State for controlling expansion of Accordion
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("User"));
    console.log(userDetails);
    // console.log(JSON.parse(userDetails));

    // SETUP YOU NEED TO LOGIN HERE

    if (localStorage.getItem("User") === null) {
      navigate("/");
    }

    // Fetch Pipeline history
    (async () => {
      try {
        const response = await get_pipeline_history(userDetails.user.id);
        if (response.status >= 200 && response.status < 300) {
          console.log(response.data.pipelines);
          setpipelineHistory(response.data.pipelines);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      {pipelineHistory && (
        <div>
          {pipelineHistory.map((pipeline, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {pipeline.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {`Number of operations: ${pipeline.operations.length}`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {pipeline.operations.map((operation, index) => (
                    <ListItem
                      key={index}
                      // secondaryAction={
                      //   <IconButton
                      //     edge="end"
                      //     aria-label="delete"
                      //     style={{ color: blueGrey[100] }}
                      //   >
                      //     <DeleteIcon />
                      //   </IconButton>
                      // }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <ConstructionIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={operation.opName} />
                      <ListItemText primary={operation.values.toString()} />
                    </ListItem>
                  ))}
                </List>
                {/* <IconButton
                  aria-label="delete"
                  style={{ color: blueGrey[100] }}
                >
                  <DeleteIcon />
                </IconButton> */}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default PipelineHistory;

/* (
      <List>
        {pipelineHistory.map((pipeline, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                style={{ color: blueGrey[100] }}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ConstructionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={pipeline.name} />
          </ListItem>
        ))}
      </List>
      ) */
