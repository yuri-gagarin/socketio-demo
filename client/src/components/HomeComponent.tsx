import React from "react";
import { Button, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
//
import { UserBar } from "./UserBar";

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

  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <Item>
          <UserBar />
        </Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ minHeight: "100px" }}>6</Item>
      </Grid>
      <Grid item lg={6} xs={12}>
        <Item style={{ minHeight: "100px" }}>6</Item>
      </Grid>
      <Grid item lg={12}>
        <Item>8</Item>
      </Grid>
    </Grid>
  )
}