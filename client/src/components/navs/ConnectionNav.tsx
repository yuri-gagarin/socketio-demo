import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ClearSharp, CompassCalibrationSharp } from "@mui/icons-material";

interface IConnectionNavProps {
  handleIOConnect: () => void;
  handleIODisconnect: () => void;

}

export const ConnectionNav: React.FC<IConnectionNavProps> = ({ handleIOConnect, handleIODisconnect }): JSX.Element => {
  return (
    <ButtonGroup>
      <Button
        variant="contained" 
        startIcon={<CompassCalibrationSharp />}
        color="primary"
        onClick={handleIOConnect}
      >
        Connect
      </Button>
      <Button 
        sx={{ color: "orange" }}
        variant="outlined" 
        endIcon={<ClearSharp color="warning" />}
        onClick={handleIODisconnect} 
      >
        Disconnect
      </Button>
    </ButtonGroup>
  )
}