import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from "../components/Main/Main";

export const CreateRoutes = () => {
    return (
        <Switch>
            { 
            <Route exact path='/' component={Main}/>
            // <Route exact path='/about' component={About}/>
            // <Route exact path='/contact' component={Profile}/> 
            }
        </Switch>
    )
}