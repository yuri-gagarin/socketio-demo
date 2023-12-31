import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { io, Manager, Socket } from 'socket.io-client';

//
import { HomeComponent } from "./components/HomeComponent";

function App() {
  return (
    <Box sx={{ flexGrow: 1, border: "3px solid green" }}>
      <HomeComponent />
    </Box>  
  );
}

export default App;
