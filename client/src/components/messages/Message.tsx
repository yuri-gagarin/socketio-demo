import React from "react";
import { Box, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';


const MessageBox = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  maxWidth: "50%",
  color: "white",
  lineHeight: '1.5em',
  background: "rgb(30, 136, 229)",
  display: "inline-flex",
  padding: "1em 0.5em",
}));


interface IMessageProps {
  content: string;
  ownMessage: boolean;
}

export const Message: React.FC<IMessageProps> = ({ content, ownMessage }): JSX.Element => {
  return (
    <Box sx={{ width: "100", paddingBottom: "0.25em", textAlign: ownMessage ? "right" : "left" }}>
      <MessageBox elevation={6}>{content}</MessageBox>
    </Box>
  );
}