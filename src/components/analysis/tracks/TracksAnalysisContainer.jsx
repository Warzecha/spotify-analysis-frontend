import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TracksAnalysisView from './TracksAnalysisView';
import axios from 'axios';


const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const TracksAnalysisContainer = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tracksData, setTracksData] = useState(null);

    const [timeRange, setTimeRange] = useState('medium_term');
    const [limit, setLimit] = useState(25);

    const fetchTracks = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/top/tracks`, {
            params: {
                timeRange: timeRange.toUpperCase(),
                token: accessToken,
                limit: limit
            }
        })
            .then(({data}) => {
                setTracksData(data);

            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTracks();
    }, []);


    return (
        <TracksAnalysisView
            loading={loading}
            error={error}
            tracksData={tracksData}
            timeRange={timeRange}
            limit={limit}
            setLimit={setLimit}
            setTimeRange={setTimeRange}
            fetchTracks={fetchTracks}
        />
    );
};

TracksAnalysisContainer.propTypes = {};

export default TracksAnalysisContainer;
