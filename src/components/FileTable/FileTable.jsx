import { useState, useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FileContext } from "../../App";
import * as api from "../../api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function FileTable() {
  const [colNames, setColNamesState] = useState([]);
  const { fileState, setFileState } = useContext(FileContext);

  useEffect(() => {
    // Generating Column names
    if (fileState.data) {
      setColNamesState(() => Object.keys(fileState.data[0]));
    }

    // return () => {
    //   // cleanup code
    // }
  }, [fileState]);

  // const getDatasetHead = async () => {
  //   const userObj = JSON.parse(localStorage.getItem("User"))
  //   const rows = await api.getDatasetHead(userObj.user.id, fileState)
  //   console.log(rows);
  // }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* Add loop for generating TableRows and TableCells  */}
            {colNames &&
              colNames.map((colHead, index) => (
                <TableCell key={index}>{colHead}</TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fileState.data &&
            fileState.data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {colNames.map((cell, index) => (
                  <TableCell key={index} component="th" scope="row">
                    {row[cell]}
                  </TableCell>
                ))}
                {/* <TableCell component="th" scope="row">
                  {row[colNames.at(index)]}
                </TableCell>
                <TableCell align="right">{row[colNames[1]]}</TableCell>
                <TableCell align="right">{row[colNames[2]]}</TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
