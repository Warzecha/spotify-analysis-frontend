import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import spotifyLogo from '../../assets/logo_spotify.svg.webp';
import Paper from '@material-ui/core/Paper';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../redux/actions/logInActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const clientId = '14f9f4dd0f2a47cab4ae8dca428fad0b';

const WelcomeContainer = () => {

    const query = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const logInState = useSelector(state => state.logIn);
    const [loading, setLoading] = useState(false);

    const {
        logged
    } = logInState;

    useEffect(() => {
        if (!!query.get('code')) {
            setLoading(true);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/connect`, {
                params: {
                    code: query.get('code')
                }
            })
                .then(({data}) => {
                    dispatch(logIn(data));
                })
        }
    }, [query]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <div style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                {!logged ? <div>
                    <Typography variant={'h3'} color={'textSecondary'}>Log in with Spotify</Typography>
                    <div style={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <Paper elevation={6} onClick={() => {
                            setLoading(true);
                            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read`
                        }} style={{
                            position: 'absolute',
                            borderRadius: 40,
                            overflow: 'hidden',
                            width: 80,
                            height: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}>
                            <img style={{
                                width: 80
                            }} src={spotifyLogo} alt={'logo'}/>

                        </Paper>
                        {loading && <CircularProgress size={80} style={{
                            position: 'absolute',
                            zIndex: 1,
                        }}/>}
                    </div>
                </div> : <Typography variant={'h3'} color={'textSecondary'}>You are logged</Typography>}
            </div>
        </div>
    );
};

export default WelcomeContainer;