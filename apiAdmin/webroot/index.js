import React from 'react'
import { render }from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Main from './common/Main'

import AdvertPut from './components/nav/AdvertPut'
import MemberManage from './components/nav/MemberManage'

import NoticePushRoute from './routes/NoticePush'
import OrderManageRoute from './routes/OrderManage'
import NewsManageRoute from './routes/NewsManage'


const routes = {
    path: "/",
    component: Main,
    childRoutes: [
        NoticePushRoute,
        {
            path: "advert_put",
            component: AdvertPut
        },
        OrderManageRoute,
        NewsManageRoute,
        {
            path: "member_manage",
            component: MemberManage
        }
    ]
};

render(
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById("root")
);