import React, {useEffect, useState} from 'react';
import TracksAnalysisView from './TracksAnalysisView';
import axios from 'axios';

const {
    REACT_APP_BACKEND_URL,
    REACT_APP_ACCESS_TOKEN
} = process.env;

const TracksAnalysisContainer = props => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [tracksData, setTracksData] = useState(null);

    const [timeRange, setTimeRange] = useState('medium_term');
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        setLoading(true);
        axios.get(`${REACT_APP_BACKEND_URL}/top/tracks`, {
            params: {
                timeRange: timeRange.toUpperCase(),
                token: REACT_APP_ACCESS_TOKEN,
                limit: limit
            }
        })
            .then(({data}) => {
                setTracksData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [timeRange, limit]);


    return (
        <TracksAnalysisView
            loading={loading}
            error={error}
            tracksData={tracksData}
            timeRange={timeRange}
            limit={limit}
            setLimit={setLimit}
            setTimeRange={setTimeRange}
        />
    );
};

TracksAnalysisContainer.propTypes = {};

export default TracksAnalysisContainer;
