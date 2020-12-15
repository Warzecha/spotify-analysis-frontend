import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {MenuItem, Slider} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

const InitialSurveyView = props => {
    const {
        selectedGenres,
        availableGenres,
        onGenreSelected,
        onGenreDeleted,
    } = props;

    const [activeStep, setActiveStep] = React.useState(0);

    const classes = useStyles();

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };


    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper className={classes.root}>

                <Stepper activeStep={activeStep}>

                    <Step>
                        <StepLabel>{'Personal data'}</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>{'Music genres'}</StepLabel>
                    </Step>

                    <Step>
                        <StepLabel>{'Music taste'}</StepLabel>
                    </Step>
                </Stepper>

                <div>
                    {
                        activeStep === 0 && (
                            <div className={classes.formSection}>
                                <TextField label='Age' variant='outlined' type={'number'}
                                           className={classes.formElement}/>
                                <TextField label='Sex' variant='outlined' className={classes.formElement} select>
                                    <MenuItem value={'male'}>
                                        Male
                                    </MenuItem>
                                    <MenuItem value={'female'}>
                                        Female
                                    </MenuItem>
                                </TextField>
                            </div>
                        )
                    }
                    {
                        activeStep === 1 && (
                            <div className={classes.formSection}>

                                <Typography className={classes.header} gutterBottom>
                                    Tell us your favourite genres?
                                </Typography>


                                <Typography color={'textSecondary'}>
                                    Your favourite music genres:
                                </Typography>

                                <div className={classes.chipRow}>
                                    {
                                        selectedGenres.map(genre => <Chip key={genre}
                                                                          label={genre}
                                                                          onDelete={() => onGenreDeleted(genre)}
                                                                          className={classes.chip}
                                        />)
                                    }
                                </div>

                                <Typography color={'textSecondary'}>
                                    Select your favourite genres:
                                </Typography>

                                <div className={classes.chipRow}>
                                    {
                                        availableGenres.map(genre => <Chip key={genre}
                                                                           label={genre}
                                                                           onClick={() => onGenreSelected(genre)}
                                                                           className={classes.chip}
                                        />)
                                    }
                                </div>


                            </div>
                        )
                    }


                    {
                        activeStep === 2 && (
                            <div className={classes.formSection}>

                                <Typography className={classes.header} gutterBottom>
                                    Tell us what you like?
                                </Typography>

                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom color={'textSecondary'}>
                                        Dance music
                                    </Typography>

                                    <Slider
                                        defaultValue={3}
                                        valueLabelDisplay='auto'
                                        step={1}
                                        min={1}
                                        max={5}
                                        marks={sliderMarks}
                                    />
                                </div>

                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom color={'textSecondary'}>
                                        Energetic music
                                    </Typography>

                                    <Slider
                                        defaultValue={3}
                                        valueLabelDisplay='auto'
                                        step={1}
                                        min={1}
                                        max={5}
                                        marks={sliderMarks}
                                    />
                                </div>


                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom color={'textSecondary'}>
                                        Instrumental music
                                    </Typography>

                                    <Slider
                                        defaultValue={3}
                                        valueLabelDisplay='auto'
                                        step={1}
                                        min={1}
                                        max={5}
                                        marks={sliderMarks}
                                    />
                                </div>

                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom color={'textSecondary'}>
                                        Live music
                                    </Typography>

                                    <Slider
                                        defaultValue={3}
                                        valueLabelDisplay='auto'
                                        step={1}
                                        min={1}
                                        max={5}
                                        marks={sliderMarks}
                                    />
                                </div>

                                <div className={classes.sliderContainer}>
                                    <Typography gutterBottom color={'textSecondary'}>
                                        Positive music
                                    </Typography>

                                    <Slider
                                        defaultValue={3}
                                        valueLabelDisplay='auto'
                                        step={1}
                                        min={1}
                                        max={5}
                                        marks={sliderMarks}
                                    />
                                </div>

                            </div>
                        )
                    }

                </div>

                <div className={classes.buttonContainer}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <Button variant='contained' color='primary' onClick={handleNext}>
                        {activeStep === 2 ? 'Finish' : 'Next'}
                    </Button>
                </div>

            </Paper>
        </div>

    );
};

const sliderMarks = [
    {
        value: 1,
        label: `Hate it`
    },
    {
        value: 5,
        label: `I love it!`
    }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 600,
        padding: 10
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    formSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10
    },
    formElement: {
        marginBottom: 20
    },
    chipRow: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 10
    },
    chip: {
        marginLeft: 5,
        marginBottom: 5
    },
    header: {
        fontSize: 20,
        textAlign: 'center'
    },
    sliderContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20

    }
});

export default InitialSurveyView;
