import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ArtistsAnalysisView from './ArtistsAnalysisView';
import axios from 'axios';


const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const ArtistsAnalysisContainer = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artistsData, setArtistsData] = useState(null);

    const [timeRange, setTimeRange] = useState('medium_term');
    const [limit, setLimit] = useState(10);

    const fetchArtists = () => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/top/artists`, {
            params: {
                timeRange: timeRange.toUpperCase(),
                token: accessToken,
                limit: limit
            }
        })
            .then(({data}) => {
                setArtistsData(data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchArtists();
    }, [limit, timeRange]);


    return (
        <ArtistsAnalysisView
            loading={loading}
            error={error}
            artistsData={artistsData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            limit={limit}
            setLimit={setLimit}
        />
    );
};

ArtistsAnalysisContainer.propTypes = {};

export default ArtistsAnalysisContainer;
