import React from "react";
import { Button, ButtonGroup, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
// 
import { io, Socket } from "socket.io-client";
//
import { UserBar } from "./UserBar";
// ts types and constants //
import { SocketEmitters, SocketListeners } from "./helpers/socketTypes";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
interface IHomeComponentProps {

}

export const HomeComponent: React.FC<IHomeComponentProps> = (): JSX.Element => {
  const [ socketState, setSocketState ] = React.useState<Socket>();

  const handleIOconnect = () => {
    const socket = io("http://localhost:8000");
    setSocketState(socket);
  }
  const handleIODisconnect = () => {

  }

  React.useEffect(() => {
    if (socketState) {
      socketState.on(SocketListeners.NewUserConnected, (data) => {
        console.log(data);
      })
    }
  }, [ socketState ]);

  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Item>
          <UserBar />
        </Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ minHeight: "100px" }}>
          <ButtonGroup>
            <Button onClick={handleIOconnect}>Connect</Button>
            <Button onClick={handleIODisconnect}>Disconnect</Button>
          </ButtonGroup>
        </Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ minHeight: "100px" }}>6</Item>
        <Paper>
          Message
        </Paper>
      </Grid>
      <Grid item lg={12}>
        <Item>8</Item>
      </Grid>
    </Grid>
  )
}