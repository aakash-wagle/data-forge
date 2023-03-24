import { useContext, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FileContext } from '../../App';
import * as api from "../../api";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}



export default function FileTable() {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const {fileState} = useContext(FileContext)
  
  //   useEffect(() => {
  //   getDatasetHead()
  //   // return () => {
  //   //   // cleanup code
  //   // }
  // }, [fileState])
  
  // const getDatasetHead = async () => {
  //   const userObj = JSON.parse(localStorage.getItem("User"))
  //   const rows = await api.getDatasetHead(userObj.user.id, fileState)
  //   console.log(rows);
  // }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
          {/* Add loop for generating TableRows and TableCells  */}
          <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell> 
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fileState && rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {fileState.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}