import React from "react";
import { Box, Container, Typography } from "@mui/material";

interface IConnectedRoomsProps {
  myRooms: string[];
  handleLeaveRoom: (roomId: string) => void;
}

export const ConnectedRooms: React.FC<IConnectedRoomsProps> = ({ myRooms, handleLeaveRoom }): JSX.Element => {

  return (
    <Box>
      <Container>
        <Typography>My Active Rooms: </Typography>
        <div>Rooms here</div>
        {
          myRooms.map((roomData) => {
            return (
              <div key={roomData}>
                { roomData }
              </div>
            )
          })
        }
      </Container>
    </Box>
  );
}