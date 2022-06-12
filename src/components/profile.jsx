import * as React from 'react';
import "./profile.css";

//import Button from '@mui/material/Button';
import commonApi from "../api/common";
import { useContext } from "react";
import { Context } from "../userContext/Context";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import LikeButton from "./likebutton";
import Box from '@mui/material/Box';
import { Avatar, Stack, Button, styled } from '@mui/material';
import Follow from './follow';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
import Drawer from './drawer'
import { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';




//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();
const Input = styled('input')({
  display: 'none',
});

export default function Profile() {


  const { dispatch } = useContext(Context);
  const { user } = useContext(Context);
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    await commonApi({
      action: "findAllPost",
      data: { data: { createdBy: user._id } },
    }).then((res) => {
      setPosts(res);
    });
  };
  const handleImage = async () => {

    const data = {

      userId: user._id,

    };
    if (file) {
      const formData = new FormData();
      const name = Date.now() + file.name;
      formData.append("name", name);
      formData.append("file", file);
      await commonApi({
        action: "uploadImage",
        data: formData,
      });
      data.profileImage = name;
    }
    await commonApi({
      action: "updateUser",
      data: data,
    }).then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res });
    });
  };
  
  const fetchUser = async () => {
    await commonApi({ action: "getUser", parameters: [user._id] }).then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res });

    })}
  useEffect(() => {
    fetchUser();
    fetchPosts();
  
    if (file) {
      handleImage()
    }

  }, [file]);


  return (
    <><Drawer /><ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">

            <Stack direction="row" spacing={4} sx={{ mt: 5 }} >
             
              <Avatar mt={2} sx={{ width: 56, height: 56 }}>

             <img src={(file && URL.createObjectURL(file)) || "http://localhost:8060/public/" + user.profileImage} className="profileUserImg" />
             
             </Avatar>
              <Typography variant="h5">
                {user.firstName}
              </Typography>


              <label htmlFor="contained-button-file">

                <Input accept="image/*"
                  id="contained-button-file"
                  multiple type="file"

                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button variant="contained" size="small" component="span" color="secondary">
                  Edit Image
                </Button>
              </label>

            </Stack>

            <Follow userData={user} display={false}/>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {posts.length !== 0 && <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post._id} xs={12} sm={6} md={4}>
                <Card
                variant="outlined"
                  sx={{  height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                     
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={"http://localhost:8060/public/" + post.images[0]}
                    alt="random" />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.desc}
                    </Typography>
                    < LikeButton likes={post.likes} disLikes={post.disLikes} fetchPosts={fetchPosts} postId={post._id} />
                  </CardContent>
                  <CardActions>
                    {/* <Button size="small">View</Button> */}
                    {/* <Button size="small">Edit</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>}
          {posts.length === 0 && <div>No post Found</div>}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">


      </Box>
      {/* End footer */}
    </ThemeProvider></>
  );
}