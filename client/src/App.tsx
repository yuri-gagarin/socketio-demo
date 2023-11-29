import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';

//
import { HomeComponent } from "./components/HomeComponent";

function App() {

  React.useEffect(() => {
    io("http://localhost:8000")
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HomeComponent />
    </Box>  
  );
}

export default App;
