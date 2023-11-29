import React from 'react';
import './App.css';
import { Box } from '@mui/material';
//
import { HomeComponent } from "./components/HomeComponent";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HomeComponent />
    </Box>  
  );
}

export default App;
