import Loadable from 'react-loadable';
import {Link, Redirect, Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

const Main = Loadable({
    loader: () => import('../app/LoginForm'),
    loading() {
        return <div>Loading...</div>
    }
});

const Profile = Loadable({
    loader: () => import('../app/LoginForm'),
    loading() {
        return <div>Loading...</div>
    }
});

const Register = Loadable({
    loader: () => import('../app/RegisterForm'),
    loading() {
        return <div>Loading...</div>
    }
});


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route
                    path='/main'
                    render={() => <Main />}
                />
                <Route
                    path='/urnews'
                />
                <Route
                    path='/profile'
                    render={() => <Profile />}
                />
                <Route
                    path='/register'
                    render={() => <Register />}
                />
                <Redirect to='/main' />
            </Switch>
        );
    }
}
