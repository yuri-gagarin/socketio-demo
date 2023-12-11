import React from 'react';
import { AppBar, Box, Container, Stack } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
// helpers and mock data //
import { setColor } from './helpers/mockData';

interface IAppBarProps {
  loggedInUsers: string[];
}
export const UserBar: React.FC<IAppBarProps> = ({ loggedInUsers }): JSX.Element => {
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [ activeUsers, setActiveUsers ] = React.useState<string[]>([]);


  return (
    <AppBar position="static" style={{ width: "100%", background: blue[600] }}>
      <Box sx={{ paddingLeft: "1em" }}>
        <Stack sx={{ padding: "1em 0" }} direction="row" spacing={-1.2} >
          {
            loggedInUsers.map((val, index) => {
              return (
                <AccountCircle key={val} sx={{ color: setColor(index) }} />
              )
            })
          }
          <AccountCircle  />
        </Stack>
      </Box>
    </AppBar>
  );
}
