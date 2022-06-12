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
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Box, Stack, IconButton, Grid, Button } from '@mui/material';
import { useContext } from 'react';
import { Context } from "../userContext/Context"
import commonApi from "../api/common"
export default function Following() {
    const [state, setState] = useState(false);
    const [friends, setFriends] = useState([])
    const { user, dispatch } = useContext(Context)
    const search = useLocation().search;
    const name = new URLSearchParams(search).get("id");
    const fetchFriends = async () => {
        await commonApi({
            action: "following",
            data: {
                userId: user._id
            }
        }).then((res) => {
            setFriends(res)
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
            // window.location.reload(false);
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
            // window.location.reload(false);
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
        })
    }
    useEffect(() => {
        fetchFriends()
    }, [])
    const follow = () => {
        setState(!state);
    }
    const navigate = useNavigate()

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
                    <Typography variant="h6">FOLLOWING
                    </Typography>
                    <Grid >
                        {friends.map((friend) => (
                            <Grid item key={friend._id} xs={12} >
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: '4' }}>
                                    <ListItem alignItems="flex-start" onClick={() => { navigate("/user-profile?id=" + friend._id) }}>

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
                                                    {friend.userName}
                                                </Typography>

                                                {(user._id !== friend._id) && (user.following.includes(friend._id)) && <HowToRegIcon onClick={() => { unFollowUser(friend._id) }} />}
                                                {(user._id !== friend._id) && (!user.following.includes(friend._id)) && < PersonAddAlt1Icon onClick={() => { followUser(friend._id) }} />}
                                            </React.Fragment>} />

                                    </ListItem>
                                    <Divider variant="inset" component="li" />


                                </List>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Container></>
    );
}