import React from 'react';
import { AppBar, Container, Icon, Stack } from '@mui/material';
import { blue, yellow } from '@mui/material/colors';

interface IAppBarProps {

}
export const UserBar: React.FC<IAppBarProps> = (): JSX.Element => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  return (
    <AppBar position="static" style={{ width: "100%", background: blue[500] }}>
      <Container maxWidth="xl">
        <Stack direction="row" spacing={3}>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
          <Icon sx={{ color: yellow[500] }}>add_circle</Icon>
        </Stack>
      </Container>
    </AppBar>
  );
}
