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
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';


const ArtistsAnalysisView = props => {
    const {
        loading,
        error,
        artistsData,
        timeRange,
        setTimeRange,
        limit,
        setLimit,
        fetchArtists
    } = props;

    const classes = useStyles();

    const ArtistComponent = ({artist}) => {

        const {
            followers,
            genres,
            images,
            name,
            popularity,
            external_urls
        } = artist;

        const {
            height,
            width,
            url
        } = images[0] || {};

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
                    <Typography className={classes.descriptionText}>{`Popularity: ${popularity}`}</Typography>
                    <Typography className={classes.descriptionText}>{`Followers: ${followers.total}`}</Typography>
                    <div>
                        {
                            genres.map(genre => <Chip size={'small'}
                                                      label={genre}
                                                      key={genre}
                                                      variant='outlined'
                                                      style={{marginLeft: 10}}/>)
                        }

                    </div>

                </div>

            </Paper>);
    };


    return (
        <div>
            <Typography color={'textSecondary'} style={{fontSize: 20}}>
                Your favourite artists
            </Typography>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 30
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
                    <Button variant={'contained'} color={'primary'} onClick={() => fetchArtists()}>
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
            {artistsData && artistsData.map(item => <ArtistComponent artist={item} key={item.id}/>)}

        </div>
    );
};

ArtistsAnalysisView.propTypes = {};

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
        // width: 160

    },
    infoContainer: {
        flex: 4,
        marginLeft: 10,
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

export default ArtistsAnalysisView;
