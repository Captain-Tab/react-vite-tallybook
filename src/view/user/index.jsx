import React, {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import { get } from '../../plugin/request'
import {Cell} from "zarm";
import CustomIcon from "../../components/common/CustomIcon";

const User = () => {
    const [user, setUser] = useState({});

    useEffect(async () => {
        await getUserInfo();
    }, []);

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await get('/api/user/get_userinfo');
        setUser(data);
    };

    return <UserContent>
        <UserHeader>
            <div className={'avatar'}>
                <img src={user.avatar || ''} alt='avatar' />
            </div>
            <div className={'userInfo'}>
                <p className={'name'}>用户: { user.userInfo || '' }</p>
                <p className={'signature'}>个性签名: { user.signature || '' }</p>
            </div>
        </UserHeader>

        <UserPanel>
            <Cell
                hasArrow
                title="用户信息修改"
                icon={<CustomIcon type="icon-edit" className={'icon'} />}/>
            <Cell
                hasArrow
                title="充值密码"
                icon={<CustomIcon type="icon-password" className={'icon'} />}/>
            <Cell
                hasArrow
                title="了解更多"
                icon={<CustomIcon type="icon-contactus" className={'icon'} />}/>
        </UserPanel>
    </UserContent>
}

export default User

const UserContent = styled.div`
  position: relative;
  height: 93%;
  background-color: #f5f5f5;;
`

const UserHeader = styled.div`
  background-color: ${props => props.theme.color};
  height: 200px;
  width: 100%;
  opacity: 0.8;
  display: flex;
  padding: 30px 20px 20px 20px;
  .avatar {
    height: 100px;
    width: 100px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .userInfo {
    color: #fff;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    margin: 20px 0 0  20px;
    .name {
      font-size: 20px;
    }
    .signature {
      margin-top: 10px;
      font-size: 17px;
      opacity: 0.7;
    }
  }
`

const UserPanel = styled.div`
  top: 150px;
  position: absolute;
  height: 200px;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0.08rem 0.05333rem 0.53333rem 0.26667rem rgb(0 0 0 / 10%);
  border-radius: 0.26667rem;;
  padding: 10px;
  .icon {
    color: ${props => props.theme.color}
  }
  .za-cell::after {
    display: none;
  }
`
