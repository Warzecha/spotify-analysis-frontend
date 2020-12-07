import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import {fancyTimeFormat} from '../../../utlis/TimeUtils';
import FilterTopListComponent from '../generic/FilterTopListComponent';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Stars';


const TracksAnalysisView = props => {
    const {
        loading,
        error,
        tracksData,
        timeRange,
        setTimeRange,
        limit,
        setLimit
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
            external_urls: externalUrls,
            polishTopListRank
        } = track;

        const {images} = album;

        const {
            height,
            width,
            url
        } = images[0] || {};


        const {spotify: spotifyUrl} = externalUrls;

        return (
            <Paper className={classes.trackContainer}>

                <Paper elevation={5} className={classes.imageContainer}
                       onClick={() => window.open(spotifyUrl)}>
                    {width > height ? (
                        <img src={url}
                             alt={name}
                             style={{width: 160}}
                        />) : (
                        <img src={url}
                             alt={name}
                             style={{
                                 height: 160
                             }}
                        />)}
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

                <div className={classes.infoContainer}>
                    {
                        polishTopListRank && (
                            <Tooltip title={`Top ${polishTopListRank} most popular in Poland`}>
                                <Chip label={`Top ${polishTopListRank}`} icon={<StarIcon/>} variant={'outlined'}/>
                            </Tooltip>)
                    }

                </div>

            </Paper>);
    };


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>

            <FilterTopListComponent
                title={'Your favourite tracks'}
                limit={limit}
                setLimit={setLimit}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
            />

            <LinearProgress style={{visibility: loading ? 'visible' : 'hidden'}}/>

            <div>
                {tracksData && tracksData.map(item => <TrackComponent track={item} key={item.id}/>)}
            </div>

        </div>
    );
};

TracksAnalysisView.propTypes = {};

const useStyles = makeStyles(theme => ({
    trackContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        height: 200,
        padding: 20,
        marginBottom: theme.spacing(1)
    },
    imageContainer: {
        maxWidth: 160,
        flex: 1,
        cursor: 'pointer'
    },
    infoContainer: {
        flex: 2,
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
    }
}));

export default TracksAnalysisView;
