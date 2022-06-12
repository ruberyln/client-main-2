import React, { useEffect, useState } from "react";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import commonApi from "../api/common";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Button } from "@mui/material";
import { Context } from "../userContext/Context";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
function LikeButton({ likes, disLikes, fetchPosts, postId }) {

    const { user } = React.useContext(Context);

    const [like, setlike] = useState(likes.length)
    const [dislike, setdislike] = useState(disLikes.length)



    const [likeactive, setlikeactive] = useState(likes.includes(user._id))
    const [dislikeactive, setdislikeactive] = useState(disLikes.includes(user._id))



    const handleLikes = async (e) => {
        e.preventDefault();

        await commonApi({
            action: "upVoting",
            data: {
                userId: user._id,
                postId: postId
            },
        }).then((res) => {
            fetchPosts();
            if (likeactive) {
                setlikeactive(false)
                setlike(like - 1)

            } else {
                setlikeactive(true)
                setlike(like + 1)
                if (dislikeactive) {
                    setdislikeactive(false)
                    setlike(like + 1)
                    setdislike(dislike - 1)
                }
            }
        })

    }

    const handleDisLikes = async (e) => {
        e.preventDefault();

        await commonApi({
            action: "downVoting",
            data: {
                userId: user._id,
                postId: postId
            },
        }).then((res) => {
            fetchPosts();
           
            if (dislikeactive) {
                setdislikeactive(false)
                setdislike(dislike - 1)
            }
            else {
                setdislikeactive(true)
                setdislike(dislike + 1)
                if (likeactive) {
                    setlikeactive(false)
                    setdislike(dislike + 1)
                    setlike(like - 1)
                }
            }

        })

    }
  
    return (
        <>{likeactive && <Button onClick={handleDisLikes} color="secondary">
            <FavoriteIcon style={{ color: "secondary" }} />
        </Button>}
            {!likeactive && <Button onClick={handleLikes} color="secondary">< FavoriteBorderIcon />
            </Button>}{like}

            {dislikeactive && <Button onClick={handleLikes} color="secondary">< ThumbDownIcon />
            </Button>}
            
            {!dislikeactive && <Button onClick={handleDisLikes} color="secondary" >
                <ThumbDownOffAltIcon /></Button>}{dislike} </>



    );
};
export default LikeButton;