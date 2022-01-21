import React from "react";
import NavBar from "./NavBar";
import {useLocation} from "react-router-dom";

function Layout({ children }) {
    return (
        <div>
            { children }
            <NavBar showNav={true}/>
        </div>
    );
}
export default Layout;
