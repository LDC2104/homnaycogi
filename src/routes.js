import React from 'react';
import Home from './components/home'
import Them from './components/them';
import Edit from './components/edit';

const routes = [
    {
        path : '/',
        exact : true,
        main : ({history}) => <Home history={history}/>
    },
    {
        path : '/them',
        exact : true,
        main : ({history}) => <Them history={history}/>
    },
    {
        path : '/edit',
        exact : true,
        main : ({history}) => <Edit history={history}/>
    }
]

export default routes;