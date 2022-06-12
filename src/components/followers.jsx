import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Drawer from './drawer';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import commonApi from "../api/common"
import { Container, Box, Stack, IconButton, Grid, Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from "../userContext/Context"
import { useLocation, useNavigate } from "react-router-dom"
export default function Followers() {
    const { user, dispatch } = useContext(Context)
    const [followers, setFollowers] = useState([])
    const search = useLocation().search;
    const name = new URLSearchParams(search).get("id");
    
    const fetchFollowers = async () => {
        await commonApi({
            action: "followers",
            data: {
                userId: name
            }
        }).then((res) => {
            setFollowers(res)
        })
    }
    const followUser = async (id) => {
        await commonApi({
            action: "followUser",
            data: {
                userId: user._id,
                followId: id
            }

        }).then((res) => {

            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        })
    }
    const unFollowUser = async (id) => {
        await commonApi({
            action: "unFollowUser",
            data: {
                userId: user._id,
                followId: id
            }
        }).then((res) => {

            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        })
    }
    const navigate = useNavigate()
    useEffect(() => {
        fetchFollowers()
    }, [])
    return (
        <><Drawer />
            <Container component="main">

                <Box
                    sx={{
                        marginTop: 11,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">FOLLOWERS
                    </Typography>
                    <Grid >


                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: '4' }}>

                            {followers.map((follower) => {

                                return (<ListItem alignItems="flex-start" key={follower._id} onClick={()=>{navigate("/user-profile?id=" + follower._id)}}>

                                    <ListItemAvatar>

                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />


                                    </ListItemAvatar>

                                    <ListItemText 

                                        secondary={<React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {follower.userName}
                                            </Typography>

                                            {(user._id !== follower._id) && (user.following.includes(follower._id)) && <HowToRegIcon onClick={() => { unFollowUser(follower._id) }} />}
                                            {(user._id !== follower._id) && (!user.following.includes(follower._id)) && < PersonAddAlt1Icon onClick={() => { followUser(follower._id) }} />}

                                        </React.Fragment>} />

                                </ListItem>
                                )

                            })
                            }
                            < Divider variant="inset" component="li" />



                        </List>
                    </Grid>


                </Box>

            </Container></>
    );
}