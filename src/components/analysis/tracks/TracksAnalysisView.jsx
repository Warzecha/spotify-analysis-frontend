import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import FilterTopListComponent from '../generic/FilterTopListComponent';
import TrackComponent from './TrackComponent';


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
