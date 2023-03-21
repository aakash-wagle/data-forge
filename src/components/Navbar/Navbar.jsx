import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="absolute" sx={{backgroundColor: 'rgba(85,167,47, .1)'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Data Forge
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}