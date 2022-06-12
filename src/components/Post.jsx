import * as React from "react";
import { styled, } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
//import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Collapse from "@mui/material/Collapse";
import commonApi from "../api/common";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//import MoreVertIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import { useState, } from "react";
import LikeButton from "./likebutton";

//import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
//import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
//import CardContent from '@mui/material/CardContent';
import { CardHeader, CardActions, CardContent } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import moment from "moment";
//import Stack from '@mui/material/Stack';
import { Context } from "../userContext/Context";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const baseImageUrl = "http://localhost:8060/public/"
function Post({ post, fetchPosts }) {
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { createdBy, desc, createdAt, _id, comments, images, likes, disLikes } = post;
 
  const { user } = React.useContext(Context);
  let imgPath = ""
  if (images.length !== 0) {
    imgPath = baseImageUrl + images[0]
  }
  const [comment, setComment] = useState("");


  const handleComment = async (e) => {
    e.preventDefault();
    let data = {
      comment: comment,
      userId: user._id,
      postId: _id,
    };
    await commonApi({
      action: "createComment",
      data: data,
    })
      .then((res) => {
        fetchPosts();
        setComment("");
      })
      .catch((error) => {
        console.error(error);
        console.error("Comment not added");
      });
  };
  const handleDelete = async (e) => {
    e.preventDefault();

    await commonApi({
      action: "deletePost",
      data:{postId:_id}
    })
      .then((res) => fetchPosts())
      .catch((error) => {
        console.error(error);
        console.error("post not deleted");
      });
  };

  return (
    <div>
      <Box component="main" sx={{   marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent:"center",
            flexGrow: 1, p: 4 }} width="100ch">
        <Container component="main">
          <Card
            alignItems="center"
            justifyContent="center"
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                   {(createdBy?._id===user?._id)&&
                 <Button  variant = "contained" size="small" color = "secondary" onClick={handleDelete}>Delete</Button>}
                 
                </IconButton>
              }
              title={createdBy ? createdBy.userName : "John"}
              subheader={moment(createdAt).format("MMMM D, YYYY")}
            />
            <CardMedia
              component="img"
              height="400"
              image={imgPath}

            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {desc}
              </Typography>
            </CardContent>

            {/* <IconButton aria-label="add to favorites">

              </IconButton> */}
            < LikeButton likes={likes} disLikes={disLikes} fetchPosts={fetchPosts} postId={_id} />
            <CardActions >
              <Typography variant="h6">View Comments
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  {" "}

                  <ExpandMoreIcon />
                </ExpandMore>
              </Typography>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Comments</Typography>
                <Typography paragraph>
                  {comments.map((c) => {
                    return (
                      <div>
                        {c?.commentedBy?.userName}
                        <span>{"      "}</span>
                        {c.comment}
                      </div>
                    );
                  })}
                </Typography>
              </CardContent>
            </Collapse>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "170ch" },
              }}
            >
              <TextField
                id="outlined-basic"
                label="comment"
                variant="outlined"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              >
                Comment
              </TextField>
            </Box>

            <Box
              m={1}
              //margin
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              onClick={handleComment}
            >
              <Button size="small" color= "secondary" variant = "contained">Post</Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </div>
  );
}

export default Post;