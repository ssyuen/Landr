import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About } from '../components/About/About';

import { Main } from "../components/Main/Main";
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Learning } from '../components/Learning/Learning';

export const CreateRoutes = () => {
    return (
        <Switch>
            
            <Route exact path='/' component={Main}/>
            <Route exact path='/Home' component={Main}/>
            <Route exact path='/Portfolio' component={Portfolio}/>
            <Route exact path='/About' component={About}/>
            <Route exact path='/Learning' component={Learning}/>
            
        </Switch>
    )
}