import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ArtistsAnalysisView from './ArtistsAnalysisView';
import axios from 'axios';


const accessToken = process.env.REACT_AAPP_ACCESS_TOKEN;

const ArtistsAnalysisContainer = props => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [artistsData, setArtistsData] = useState(null);

    const [timeRange, setTimeRange] = useState('medium_term');


    useEffect(() => {

        setLoading(true);
        axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            params: {
                time_range: timeRange,
                limit: 10,
                offset: 0
            }
        })
            .then(({data}) => {
                console.log('data', data);
                const {items = []} = data;
                setArtistsData(items);

            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });


    }, [timeRange]);


    return (
        <ArtistsAnalysisView
            loading={loading}
            error={error}
            artistsData={artistsData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
        />
    );
};

ArtistsAnalysisContainer.propTypes = {};

export default ArtistsAnalysisContainer;
