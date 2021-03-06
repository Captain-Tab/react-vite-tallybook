import React, { useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { Cell, Toast } from "zarm";
import CustomIcon from "../../components/common/CustomIcon";
import { navigate } from "hookrouter";
import { fetchUserInfo } from "../../fetch";

const User = () => {
    const [user, setUser] = useState({});

    useEffect(async () => {
        await getUserInfo();
    }, []);

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await fetchUserInfo()
        setUser(data);
    };

    // 账号退出
    const logout = () => {
        Toast.show({
            content: '退出账号成功!',
            stayTime: 600,
            afterClose: () => {
                localStorage.removeItem('token')
                navigate('/login')
            }
        })
    }

    // 路由跳转
    const routeRoaming = (path) => {
        navigate(`/user/` + path)
    }

    return <UserContent>
        <UserHeader>
            <div className={'avatar'}>
                <img src={user.avatar || ''} alt='avatar' />
            </div>
            <div className={'userInfo'}>
                <p className={'name'}>用户: { user.username || '' }</p>
                <p className={'signature'}>昵称: { user.nickname || '' }</p>
            </div>
        </UserHeader>
        <UserPanel>
            <Cell
                hasArrow
                title="用户信息修改"
                onClick={() => routeRoaming('edit')}
                icon={<CustomIcon type="icon-edit" className={'icon'} />}/>
            <Cell
                hasArrow
                title="重置密码"
                onClick={() => routeRoaming('reset')}
                icon={<CustomIcon type="icon-password" className={'icon'} />}/>
            <Cell
                hasArrow
                title="了解更多"
                onClick={() => routeRoaming('about')}
                icon={<CustomIcon type="icon-contactus" className={'icon'} />}/>
        </UserPanel>
        <LogOut onClick={logout}>退出账号</LogOut>
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

const LogOut = styled.div`
  background-color: ${props => props.theme.light};
  position: absolute;
  color: #FFF;
  font-family: PingFangSC-Medium, PingFang SC, serif;
  bottom: 2%;
  padding: 3%;
  border-radius: 8px;
  text-align: center;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
`
