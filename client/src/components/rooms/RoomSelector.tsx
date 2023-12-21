import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material/';
import { Room } from '@mui/icons-material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const defaultRooms = [
  "Sports",
  "Politics",
  "News",
  "Art",
  "Music",
  "Movies"
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IRoomSelectorProps {
  handleJoinRoom: () => void;
}

export const RoomSelector: React.FC<IRoomSelectorProps> = ( { handleJoinRoom }) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={{ display: "inline-flex"}}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Active Rooms</InputLabel>
        <Select
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Active Rooms" />}
          MenuProps={MenuProps}
        >
          {defaultRooms.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Button 
          sx={{ height: "55px" }}
          variant="contained" 
          startIcon={<Room/>} 
          color="primary"  
          onClick={handleJoinRoom}
        >
          Join Room 
        </Button>
      </FormControl>
    </Box>
  );
}