import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { navigate } from 'hookrouter'

const NavBar = ({ showNav }) => {
    const [activeKey, setActiveKey] = useState('/');

    const changeTab = (path) => {
        setActiveKey(path)
        navigate(path, true)
    }

    return (
        <TabBar visible={showNav}
                activeKey={activeKey}
                onChange={changeTab}>
            <TabBar.Item
                itemKey="/"
                title="账单"
            />
            <TabBar.Item
                itemKey="/statics"
                title="统计"
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
            />
        </TabBar>
    );
};

NavBar.propTypes = {
    showNav: PropTypes.bool
}

export default NavBar;
