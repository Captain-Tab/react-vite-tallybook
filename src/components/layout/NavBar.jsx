import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import { TabBar } from 'zarm';
import { navigate } from 'hookrouter'
import CustomIcon from "../common/CustomIcon";

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
                icon={<CustomIcon type="icon-wallet" />}
            />
            <TabBar.Item
                itemKey="/statics"
                title="统计"
                icon={<CustomIcon type="icon-data" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<CustomIcon type="icon-usercenter" />}
            />
        </TabBar>
    );
};

NavBar.propTypes = {
    showNav: PropTypes.bool
}

export default NavBar;
