import {useRoutes} from 'hookrouter';
import React from "react";
import Bill from "../view/bill";
import Statics from "../view/statics";
import User from "../view/user";
import Login from "../view/login";
import Layout from '../components/layout';
import Detail from "../view/detail";

// wrap the page component
function withLayout(page){
    return <Layout>{page}</Layout>
}

// define route map
const routes = {
    '/' :()=> withLayout(<Bill/> ),
    '/statics': ()=> withLayout(<Statics />),
    '/user' :()=> withLayout(<User/>),
    '/login': ()=> <Login />,
    '/detail': ()=> <Detail />
};

function routeComponents() {
    return useRoutes(routes)
}

export default routeComponents
