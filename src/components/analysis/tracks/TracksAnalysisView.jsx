import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fancyTimeFormat} from '../../../utlis/TimeUtils';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';


const TracksAnalysisView = props => {
    const {
        loading,
        error,
        tracksData,
        timeRange,
        setTimeRange,
        limit,
        setLimit,
        fetchTracks
    } = props;

    const classes = useStyles();

    const TrackComponent = ({track}) => {

        const {
            name,
            artists,
            uri,
            type,
            popularity,
            id,
            href,
            explicit,
            album,
            preview_url,
            duration_ms,
            external_urls
        } = track;

        const {
            images,
        } = album;

        const {
            height,
            width,
            url
        } = images[0] || {};

        console.log(external_urls);

        return (
            <Paper className={classes.artistContainer}>

                <Paper elevation={5} className={classes.imageContainer}
                       onClick={() => window.open(external_urls.spotify)}>
                    {width > height ? <img src={url}
                                           alt={name}
                                           style={{
                                               width: 160
                                           }}
                    /> : <img src={url}
                              alt={name}
                              style={{
                                  height: 160
                              }}
                    />}
                </Paper>

                <div className={classes.infoContainer}>

                    <Typography className={classes.nameText} variant={'h5'}>{name}</Typography>
                    <Typography className={classes.descriptionText}
                                variant={'h6'}>{artists.map(i => i.name).join(", ")}</Typography>
                    <Typography
                        className={classes.descriptionText}>{`Duration: ${fancyTimeFormat(duration_ms / 1000)}`}</Typography>
                    <Typography className={classes.descriptionText} style={{
                        visibility: explicit ? 'visible' : 'hidden'
                    }}>{`Explicit`}</Typography>
                    <audio controls={'controls'}>
                        <source src={preview_url} type={'audio/mpeg'}/>
                    </audio>
                </div>

            </Paper>);
    };


    return (
        <div>
            <Typography color={'textSecondary'} style={{fontSize: 20}}>
                Your favourite tracks
            </Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30,
                marginTop: 30
            }}>

                <div style={{minWidth: '20%', maxWidth: '50%', margin: 10}}>
                    <InputLabel>Time range</InputLabel>
                    <Select
                        value={timeRange}
                        onChange={event => setTimeRange(event.target.value)}
                        style={{
                            width: '100%'
                        }}
                    >
                        <MenuItem value={'short_term'}>Short</MenuItem>
                        <MenuItem value={'medium_term'}>Medium</MenuItem>
                        <MenuItem value={'long_term'}>Long</MenuItem>
                    </Select>
                </div>
                <div style={{
                    minWidth: '30%',
                    margin: 10,
                }}>
                    <Typography color={'textSecondary'}>Records</Typography>
                    <Slider
                        defaultValue={limit}
                        step={1}
                        marks
                        min={10}
                        max={50}
                        onChange={(e, newValue) => setLimit(newValue)}
                        valueLabelDisplay={'auto'}/>
                </div>
                <div style={{
                    margin: 10
                }}>
                    <Button variant={'contained'} color={'primary'} onClick={() => fetchTracks()}>
                        Fetch
                    </Button>
                </div>

            </div>
            <div style={{
                width: '100%',

                visibility: loading ? 'visible' : 'hidden'
            }}>
                <LinearProgress/>
            </div>
            {tracksData && tracksData.map(item => <TrackComponent track={item} key={item.id}/>)}

        </div>
    );
};

TracksAnalysisView.propTypes = {};

const useStyles = makeStyles(theme => ({
    artistContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: 200,
        padding: 20,
        // borderRadius: 10,
        // border: '1px solid #d1d5da'
        marginBottom: theme.spacing(1)
    },
    imageContainer: {
        width: 160,
        cursor: 'pointer'
    },
    image: {
        // width: '100%',
        // height: 'auto',
        height: 160

    },
    infoContainer: {
        flex: 4,
        marginLeft: 20,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
    },
    nameText: {
        fontWeight: 'bold'
    },
    descriptionText: {
        color: theme.palette.text.secondary
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center'
    }
}));

export default TracksAnalysisView;
