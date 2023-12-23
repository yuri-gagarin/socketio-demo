import React from "react";
import { Box, TextField } from "@mui/material";
//
import { Message } from "./Message";
//
import type { MsgData } from "../../types/messageType";

interface IMessengerComponentProps {
  messages: MsgData[];
}


export const MessengerComponent: React.FC<IMessengerComponentProps> = ({ messages }): JSX.Element => {

  const msgRef = React.useRef<string>("");
  const endMsgRef = React.useRef<HTMLDivElement | null>(null);

  const handleMsgInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    msgRef.current = e.target.value;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      console.log(msgRef.current);
      // handle send a new meessage and validate firsts //
    }
  }
  const autoScrollBottom = (): void => {
    endMsgRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    autoScrollBottom();
  }, [ messages]);

  return (
    <>
      <Box sx={{ overflow: "scroll", height: "80%" }}>
        {
          messages.map((msg, i) => {
            return (
              <Message key={msg.id} content={msg.content} ownMessage={ i % 2 === 0 ? true : false } />
            )
          })
        }
        <div 
          style={{ float: "left", clear: "both"}}
          ref={endMsgRef}
        />
      </Box>
      <Box sx={{ border: "2px solid rgb(30, 136, 229)", paddingBottom: "1px", borderRadius: "5px" }}>
        <TextField 
          sx={{ width: "100%" }} 
          label="message..." 
          variant="filled" 
          onChange={ handleMsgInputChange } 
          onKeyDown={ handleKeyDown } 
        />
      </Box>
    </>
  )
}