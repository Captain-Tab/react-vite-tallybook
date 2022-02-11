import React, { useState } from 'react'
import CustomIcon from "../../components/common/CustomIcon";
import { Button, Cell, Checkbox, Input, Toast } from "zarm";
import styled from '@emotion/styled';
import LogoSrc from '/src/assets/img/logo.png';
import { navigate } from "hookrouter";
import {userLogin, userRegister} from "../../fetch";

const Login = () => {

    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [action, setActionType] = useState('login')

    // 提交表单
    const onSubmit = async () => {
        if (!username || !password) {
            Toast.show('请输入账号和密码')
            return
        }
        try {
            // 判断是否是登录状态
            if (action === 'login') {
                // 执行登录接口，获取 token
                const { data } = await userLogin({ username, password })
                // 将 token 写入 localStorage
                localStorage.setItem('token', data.token);
                Toast.show({
                    content: '登录成功!',
                    stayTime: 600,
                    afterClose: () => {
                        navigate('/')
                    }
                })
            } else {
                await userRegister( { username, password });
                Toast.show('注册成功');
                // 注册成功，自动将 tab 切换到 login 状态
                setActionType('login');
            }
        } catch (error) {
            Toast.show(error);
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
                {
                    action === 'register' ?
                        <div className={'protocol'}>
                            <Checkbox />
                            <label className="text-light">阅读并同意<a>《无言条款》</a></label>
                        </div> : null
                }

                { action === 'login' ?
                    <div className={'goLogin'}>暂无账号？<p onClick={()=> setActionType('register')}>点击注册</p></div>
                    :
                    <div className={'goLogin'}>已有账号？ <p onClick={()=> setActionType('login')}>立即登录</p></div>
                }
            </div>

            <Button block  theme="primary" onClick={onSubmit}>
                {action === 'login' ? '登录' : '注册'}
            </Button>
        </BottomPart>
    </LoginBody>
}

export default Login

const LoginBody = styled.div`
    height: 100%;
    padding: 20% 7% 10% 7%;
`

const LogoTitle = styled.h2`
    text-align: center;
    color: black;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-size: 17px;
    margin: 20px 0;
`

const LogoImg = styled.img`
    display: flex;
    width: 50%;
    margin: 0 auto;
`

// bottom  css
const BottomPart = styled.div`
    margin: 15px;
    .tipPart {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      .protocol {
        > label {
          margin-left: 10px;
        }
      }
      .goLogin{
        display: flex;
        align-items: center;
        p {
          text-decoration: underline;
          color: ${props => props.theme.color};
        }
      }
    }
`
