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


const ArtistsAnalysisView = props => {
    const {
        loading,
        error,
        artistsData,
        timeRange,
        setTimeRange
    } = props;

    const classes = useStyles();

    const ArtistComponent = ({artist}) => {

        const {
            followers,
            genres,
            images,
            name,
            popularity
        } = artist;

        const {
            height,
            url
        } = images[2] || {};

        return (
            <Paper className={classes.artistContainer}>

                <div className={classes.imageContainer}>
                    <img src={url}
                         alt={name}
                         className={classes.image}
                    />
                </div>

                <div className={classes.infoContainer}>

                    <Typography className={classes.nameText}>{name}</Typography>
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

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>

                <Typography color={'textSecondary'} style={{fontSize: 20}}>
                    Your favourite artists
                </Typography>

                <FormControl style={{minWidth: 150}}>
                    <InputLabel>Time range</InputLabel>
                    <Select
                        value={timeRange}
                        onChange={event => setTimeRange(event.target.value)}
                    >
                        <MenuItem value={'short_term'}>Short</MenuItem>
                        <MenuItem value={'medium_term'}>Medium</MenuItem>
                        <MenuItem value={'long_term'}>Long</MenuItem>
                    </Select>
                </FormControl>

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
        height: '100%',
        padding: 20,
        // borderRadius: 10,
        // border: '1px solid #d1d5da'
        marginBottom: theme.spacing(1)
    },
    imageContainer: {
        maxWidth: 80,
        flex: 1
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    infoContainer: {
        flex: 4,
        marginLeft: 10,
        padding: 5,
        display: 'flex',
        flexDirection: 'column'
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
