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

import { Container, Box, Stack, IconButton, Grid, Button } from '@mui/material';
import commonApi from '../api/common';
import { useContext } from 'react';
import { Context } from '../userContext/Context';

export default function Suggestions() {
    const [state, setState] = useState(false);
    const { user, dispatch } = useContext(Context)
    const [lists, setSuggestions] = useState([])
    const follow = () => {
        setState(!state);
    }
    const fetchSuggestions = async () => {
        await commonApi({
            action: "suggestions",
            data: {
                userId: user._id
            }
        }).then((res) => {
            setSuggestions(res)
        })
    }
    const handleSuggestion = async (id) => {

        await commonApi({
            action: "followUser",
            data: {
                userId: user._id,
                followId: id
            }

        }).then((res) => {
            dispatch({ type: "LOGIN_SUCCESS", payload: res });
            fetchSuggestions()

        })
    }

    useEffect(() => {
        fetchSuggestions()
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
                    <Typography variant="h6">SUGGESTIONS
                    </Typography>
                    <Grid >
                        {lists.map((list) => (
                            <Grid item key={list} xs={12} >
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mt: '4' }}>
                                    <ListItem alignItems="flex-start">

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
                                                    {list.userName}
                                                </Typography>


                                                <PersonAddAlt1Icon onClick={() => { handleSuggestion(list._id) }} />

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