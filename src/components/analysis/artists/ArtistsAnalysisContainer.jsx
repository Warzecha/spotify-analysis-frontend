import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ArtistsAnalysisView from './ArtistsAnalysisView';
import axios from 'axios';


const accessToken = 'BQANm_kCSkPCKnXEmeawRudW42Qq7qzCyx2F4xIvnW6GDbUXKwicjFLSumnjs6DzBQLjkWkZV074Ydgee0fcXjRUAY0J6z9oa3K2WTS4-3DKzd26UTPzEgol0bg5la64Zeo72OeE-26faEWG6JoTM0wJwuVOOfWG9k4l5XN7QvuZoJUl9cAwkxJGU09--j8FwaAhetNTaQOi2GS0waVd6N0BuLvfoF03WTxbnEYUQWZGPAmhuoHuLaHTO5C9YHXXkL_wLrrddMVOR-fSr5ZpbVWxqENf_cHiFnEc04Y';

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
