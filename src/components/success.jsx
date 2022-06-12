import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
const theme = createTheme();
export default function Success() {
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
          sx={{
           
            marginTop: 8,
            backgroundColor :"",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          
          }}
        >
       <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
            <CheckRoundedIcon />
          </Avatar>
  <Typography component="h1" variant="h3"
  sx = {{ m: 1,  }}>
          Account Successfully Created 
          </Typography>


          <Button
              type="submit"
              Width
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              color = "secondary"
              component ={Link}
              href = {"/signin "}
              
            >
              Sign In
            </Button>
        </Box>
        </Container>
        </ThemeProvider>

  );
}
