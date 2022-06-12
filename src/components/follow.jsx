
import React, { useState } from "react";
//import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Stack, Button, IconButton, Link } from '@mui/material'
import { useContext } from "react";
import { Context } from "../userContext/Context";
//import Followers from "./followers";
//import Following from "./following";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import commonApi from "../api/common";

function Follow({ userData, display ,fetchUser}) {
    const { user, dispatch } = useContext(Context)
    const [state, setState] = useState(user?.following?.includes(userData?._id));
   
    const followUser = async () => {
        await commonApi({
            action: "followUser",
            data: {
                userId: user?._id,
                followId: userData?._id
            }
        }).then((res) => {
            setState(true);
            fetchUser()
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        })
    }
    const unFollowUser = async () => {
        await commonApi({
            action: "unFollowUser",
            data: {
                userId: user?._id,
                followId: userData?._id
            }
        }).then((res) => {
            setState(false);
            fetchUser()
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        })
    }
    return (
        <Stack
            sx={{ pt: 0.5 }}
            direction="row"
            spacing={10}
            justifyContent="center">
            <Stack direction="row" spacing={6} mt={10}>
                <Button variant="contained" color="secondary"
                    component={Link}
                    href={"/followers?id="+userData?._id}> Followers {userData?.followers?.length || 0}
                </Button>

                <Button variant="contained" color="secondary"
                    component={Link}
                    href={"/following?id="+userData?._id} >Following {userData?.following?.length || 0}  </Button>

                {display && 
                    (state ? <HowToRegIcon onClick={unFollowUser} />: < PersonAddAlt1Icon onClick={followUser}/>)}
            </Stack>
            
        </Stack>
    );
};

export default Follow