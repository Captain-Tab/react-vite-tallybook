import React from 'react'
import styled from "@emotion/styled";

const About = () => {
    return <AboutContent>
        <p>暂无更多信息...</p>
    </AboutContent>
}

export default About

const AboutContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.color};
  font-size: 17px;
`


