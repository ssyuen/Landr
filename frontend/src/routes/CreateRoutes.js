import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Main } from "../components/Main/Main";
import { Portfolio } from '../components/Portfolio/Portfolio';
import { Profile } from '../components/Profile/Profile';

export const CreateRoutes = () => {
    return (
        <Switch>
            
            <Route exact path='/' component={Main}/>
            <Route exact path='/Home' component={Main}/>
            <Route exact path='/Portfolio' component={Portfolio}/>
            <Route exact path='/Profile' component={Profile}/>
            
        </Switch>
    )
}