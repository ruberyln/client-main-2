import * as React from 'react';
import { styled } from '@mui/material/styles';
//import FormGroup from '@mui/material/FormGroup';
//import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import {Typography,Box }from '@mui/material';



const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#a22bd9' : '#a22bd9',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,255,0.3)',
    boxSizing: 'border-box',
  },
}));

export default function Toggle() {
  return (
<Box  sx={{
            marginTop: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
      <Stack direction="row" spacing={1} alignItems="flex-end" justifyContent= "flex-end">
        <Typography>Others</Typography>
        <AntSwitch defaultChecked color ="secondary" inputProps={{ 'aria-label': 'ant design' }}

  />
        <Typography>Following</Typography>
      </Stack>
      
      </Box>
  );
}