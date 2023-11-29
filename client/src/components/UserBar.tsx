import React from 'react';
import { AppBar, Button, ButtonGroup, Container, Icon, Stack } from '@mui/material';
import { green, teal } from '@mui/material/colors';

interface IAppBarProps {

}
export const UserBar: React.FC<IAppBarProps> = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  return (
    <AppBar position="static" style={{ width: "100%", background: teal[100] }}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={3}>
          <Icon>add_circle</Icon>
          <Icon color="primary">add_circle</Icon>
          <Icon sx={{ color: green[500] }}>add_circle</Icon>
          <Icon>add_circle</Icon>
          <Icon>add_circle</Icon>
        </Stack>
      </Container>
      <ButtonGroup>
        <Button>Connect</Button>
        <Button>Disconnect</Button>
      </ButtonGroup>
    </AppBar>
  );
}
