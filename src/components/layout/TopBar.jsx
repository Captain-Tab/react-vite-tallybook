import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon } from 'zarm';
import styled from "@emotion/styled";

const Header = ({ children, title = '' }) => {
    return <TopBarWrapper>
        <TopBar>
            <div className={'block'}>
                <NavBar
                    className={'top'}
                    left={
                        <Icon type="icon-arrow-left-circle"
                              theme="primary"
                              onClick={() => history.back()}/>}
                    title={title}
                />
            </div>
        </TopBar>
        <DisplayContent>
            {children}
        </DisplayContent>
    </TopBarWrapper>

};

Header.propTypes = {
    title: PropTypes.string, // 标题
};

export default Header;

const TopBarWrapper = styled.div`
  height: calc(100% - 48px);
  width: 100%;
`

const TopBar = styled.div`
  border-bottom: 1px solid #e9e9e9;
  .block {
    width: 100%;
    height: 46px;
    :global {
      .za-nav-bar__title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.9);
      }
      .za-icon--arrow-left {
        font-size: 20px;
      }
    }
  }
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    .more {
      font-size: 20px;
    }
  }
`

const DisplayContent = styled.div`
  height: 100%;
  background-color: #f5f5f5;
`
