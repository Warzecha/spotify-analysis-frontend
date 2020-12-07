import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import {makeStyles} from '@material-ui/core';
import ArtistsAnalysisContainer from '../components/analysis/artists/ArtistsAnalysisContainer';
import SwitchComponent from '../components/analysis/switch/SwitchComponent';
import InitialSurveyContainer from '../components/survey/InitialSurveyContainer';

const MainNavigation = () => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Switch>
                <Route path='/login'>
                    {/*<SignInFormContainer/>*/}
                    <div>
                        logowanko
                    </div>
                </Route>

                <Route path={'/analysis'}>
                    <SwitchComponent/>
                </Route>

                <Route path={'/initial-survey'}>
                    <InitialSurveyContainer/>
                </Route>

                {/*<Route>*/}
                {/*    <PageNotFoundComponent/>*/}
                {/*</Route>*/}

            </Switch>
        </main>);
};

const useStyles = makeStyles(theme => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
    },
    toolbar: {
        minHeight: 48
    }
}));

export default MainNavigation;

