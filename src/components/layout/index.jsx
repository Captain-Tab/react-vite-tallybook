import {useTitle} from 'hookrouter';
import React from "react";

import NavBar from "./NavBar";
function Layout({ children }) {
    return (
        <div>
            { children }
            <NavBar showNav={true}/>
        </div>
    );
}
export default Layout;
