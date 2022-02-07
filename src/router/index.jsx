import {useRoutes} from 'hookrouter';
import React from "react";
import Bill from "../view/bill";
import Statics from "../view/statics";
import User from "../view/user";
import Login from "../view/login";
import Layout from '../components/layout';
import Detail from "../view/detail";
import TopBar from "../components/layout/TopBar";
import About from "../view/user/about";
import EditUser from "../view/user/edit-user";
import Reset from "../view/user/reset-password";

// wrap the page component with NavBar
function withLayout(page){
    return <Layout>{page}</Layout>
}

// wrap the page component with TopBar
function withTopBar(page, title) {
    return <TopBar title={title}>{page}</TopBar>
}

// define route map
const routes = {
    '/' :()=> withLayout(<Bill/> ),
    '/login': ()=> <Login />,
    '/statics': ()=> withLayout(<Statics />),
    '/user' :()=> withLayout(<User/>),
    '/user/about': ()=> withTopBar(<About />, '了解更多'),
    '/user/edit': ()=> withTopBar(<EditUser />, '个人信息'),
    '/user/reset': ()=> withTopBar(<Reset/>, '重置密码'),
    '/detail': ()=> withTopBar(<Detail />, '账单详情'),
};

function routeComponents() {
    return useRoutes(routes)
}

export default routeComponents
