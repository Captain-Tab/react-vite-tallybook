import React from "react";
import NavBar from "./NavBar";
import styled from "@emotion/styled";

function Layout({ children }) {
    return (
        <Container>
            { children }
            <NavBar showNav={true}/>
        </Container>
    );
}
export default Layout;

const Container = styled.div`
  width: 100%;
  height: 100%;
`
