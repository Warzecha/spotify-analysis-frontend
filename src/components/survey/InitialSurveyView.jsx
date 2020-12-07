import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


const InitialSurveyView = props => {

    const [activeStep, setActiveStep] = React.useState(0);

    const classes = useStyles();

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };


    return (
        <Paper className={classes.root}>

            <Stepper activeStep={activeStep}>

                <Step>
                    <StepLabel>{'Personal data'}</StepLabel>
                </Step>

                <Step>
                    <StepLabel>{'Music taste'}</StepLabel>
                </Step>

                <Step>
                    <StepLabel>{'Hobbies'}</StepLabel>
                </Step>
            </Stepper>

            <div>
                {
                    activeStep === 0 && (
                        <div className={classes.formSection}>

                            <TextField label='Age' variant='outlined' type={'number'} className={classes.formElement}/>
                            <TextField label='Sex' variant='outlined' className={classes.formElement}/>

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
    );
};

const useStyles = makeStyles({
    root: {
        width: '100%',
        padding: 10
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    formSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    formElement: {
        marginBottom: 10
    },
});

export default InitialSurveyView;
