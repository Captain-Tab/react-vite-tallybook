import {useRoutes} from 'hookrouter';
import React from "react";
import Bill from "../view/bill";
import Statics from "../view/statics";
import User from "../view/user";
import Layout from '../components/layout';

// wrap page component
function withLayout(page){
    return <Layout>{page}</Layout>
}

const routes = {
    '/' :()=> withLayout( <Bill/> ),
    '/statics': ()=> withLayout(<Statics />),
    '/user' :()=> withLayout(<User/>)
};

function routeComponents() {
    return useRoutes(routes)
}

export default routeComponents
