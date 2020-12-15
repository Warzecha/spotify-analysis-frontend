import React, {useState} from 'react';
import InitialSurveyView from './InitialSurveyView';

const InitialSurveyContainer = () => {

    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');


    const [selectedGenres, setSelectedGenres] = useState([]);
    const [availableGenres, setAvailableGenres] = useState(initialGenres);

    const handleGenreSelected = genre => {
        setSelectedGenres(prev => [...prev, genre]);
        setAvailableGenres(prev => prev.filter(g => g !== genre));
    };

    const handleGenreDeleted = genre => {
        setSelectedGenres(prev => prev.filter(g => g !== genre));
        setAvailableGenres(prev => [...prev, genre]);
    };

    return (
        <InitialSurveyView
            selectedGenres={selectedGenres}
            availableGenres={availableGenres}
            onGenreSelected={handleGenreSelected}
            onGenreDeleted={handleGenreDeleted}
        />
    );
};

const initialGenres = [
    'Pop',
    'Hip-hop',
    'Rap',
    'Rock',
    'Dance Music',
    'Electronic',
    'Latin',
    'Indie Rock',
    'Alternative',
    'Classical',
    'K-Pop',
    'Country',
    'Metal',
    'Jazz',
    'Funk',
    'Blues',
    'R&B',
    'Techno',
    'Dubstep',
    'Gospel',
    'Grunge',
    'House',
    'Folk',
    'Lo-Fi',
    'Punk',
    'Reggae',
    'Soul'
];

export default InitialSurveyContainer;
