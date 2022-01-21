import React, {useEffect, useState} from 'react'
import CustomIcon from "../../components/common/CustomIcon";
import {Button, Cell, Checkbox, Input, Toast} from "zarm";
import styled from '@emotion/styled';
import LogoSrc from '/src/assets/img/logo.png';
import { post } from '/src/plugin/request'


const LoginBody = styled.div`
    height: 100%;
    padding: 30% 7% 10% 7%;
`


const LogoTitle = styled.h2`
    text-align: center;
    color: black;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-size: 17px;
`


const LogoImg = styled.img`
    display: flex;
    width: 50%;
    margin: 0 auto;
`

// bottom  css
const BottomPart = styled.div`
    margin: 15px;
    > .tipPart {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      > .protocol {
        > label {
          margin-left: 10px;
        }
      }
      > .goLogin{
        display: flex;
        align-items: center;
        p {
          text-decoration: underline;
          color: #F08830;
        }
      }
    }
`


const Login = () => {

    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [action, setActionType] = useState('register')

    useEffect(()=>{
        console.log('哇', action)
    }, [action])

    // 提交表单
    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号')
            return
        }
        if (!password) {
            Toast.show('请输入密码')
            return
        }
        try {
            await post('/api/user/register', {
                username,
                password
            });
            Toast.show('注册成功');
        } catch (error) {
            Toast.show('系统错误');
        }
    };

    return <LoginBody>
        <LogoImg src={LogoSrc}/>
        <LogoTitle>火星记账本</LogoTitle>
        <div>
            <Cell icon={<CustomIcon type="icon-user" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={(value) => setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type="icon-lock" />}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
            {/*<Cell icon={<CustomIcon type="icon-lock" />}>*/}
            {/*    <Input*/}
            {/*        clearable*/}
            {/*        type="text"*/}
            {/*        placeholder="请输入验证码"*/}
            {/*        onChange={(value) => setVerify(value)} />*/}
            {/*    <Captcha charNum={4} />*/}
            {/*</Cell>*/}
        </div>
        <BottomPart>
            <div className={'tipPart'}>
                <div className={'protocol'}>
                    <Checkbox />
                    <label className="text-light">阅读并同意<a>《无言条款》</a></label>
                </div>
                <div className={'goLogin'}>已有账号？ <p onClick={()=> setActionType('login')}>立即登录</p></div>
            </div>

            <Button block  theme="primary" onClick={onSubmit}>注册</Button>
        </BottomPart>
    </LoginBody>
}


export default Login
