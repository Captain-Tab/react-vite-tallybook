import {useRoutes} from 'hookrouter';
import About from '../view/About';
import Index from "../view/index";

const routes = {
    '/' :()=><Index/>,
    '/about' :()=> <About/>,
};

function routeComponents() {
    return useRoutes(routes)
}

export default routeComponents
