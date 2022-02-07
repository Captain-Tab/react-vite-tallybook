import React, {useEffect, useRef, useState} from 'react'
import styled from "@emotion/styled";
import CustomIcon from "../../../components/common/CustomIcon";
import {get, post} from "../../../plugin/request";
import PopupInput from "../../../components/view/user/PopupInput";
import {FilePicker, Toast} from "zarm";
import axios from "axios";
import {navigate} from "hookrouter";


const EditUser = () => {
    const inputRef = useRef(); // 输入类型 ref
    const token = localStorage.getItem('token'); // 登录令牌
    const [label, setLabel] = useState({
        name: '',
        value: ''
    }) // 输入框名称
    const [user, setUser] = useState({
        avatar: '',
        username: '',
        signature: ''
    })

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await get('/api/user/get_userinfo');
        setUser(data)
    }

    // 显示输入弹窗
    const showInput = (label) => {
        setLabel(label)
        inputRef.current && inputRef.current.show()
    }

    // 获取图片回调
    const handleSelect = (file) => {
        console.log('file.file', file.file)
        if (file && file.file.size > 200 * 1024) {
            Toast.show('上传头像不得超过 200 KB！！')
            return
        }
        let formData = new FormData()
        // 生成 form-data 数据类型
        formData.append('file', file.file)
        // 通过 axios 设置  'Content-Type': 'multipart/form-data', 进行文件上传
        axios({
            method: 'post',
            url: `http://127.0.0.1:7001/api/upload`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token
            }
        }).then(res => {
            // 返回图片地址
            const imgUrl = `http://127.0.0.1:7001` + res.data
            setUser({
                ...user,
                avatar: imgUrl
            })
        })
    }

    // 获取输入内容
    const changeInput = (label) => {
        setLabel(label)
        label.name === 'username' ?
        setUser({
            ...user,
            username: label.value
        }) :
        setUser({
            ...user,
            signature: label.value
        })
    }

    // 更新用户信息
    const submit = async () => {
        await post('/api/user/edit_userinfo', user);
        Toast.show('修改用户成功');
        navigate('/user')
    }

   // 获取用户信息
    useEffect(() => {
        getUserInfo();
    }, []);

    return <EditUserContent>
    <FilePicker onChange={handleSelect} accept="image/*">
        <UserInfoDetail>
            <p>头像</p>
            <div className={'right'}  >
                <img src={user.avatar} alt='avatar'/>
                <CustomIcon type="icon-right" theme='primary' className={'icon'}/>
            </div>
        </UserInfoDetail>
    </FilePicker>

    <UserInfoDetail onClick={()=> showInput({
        name: 'username',
        value: user.username
    })}>
        <p>用户名</p>
        <div className={'right'}>
            <p>{ user.username }</p>
            <CustomIcon type="icon-right" theme='primary' className={'icon'}/>
        </div>

    </UserInfoDetail>
    <UserInfoDetail onClick={()=> showInput({
        name: 'signature',
        value: user.signature
    })}>
        <p>签名</p>
        <div className={'right'}>
            <p>{ user.signature }</p>
            <CustomIcon type="icon-right" theme='primary' className={'icon'}/>
        </div>
    </UserInfoDetail>

     <SubmitButton onClick={submit}>保存</SubmitButton>

     <PopupInput ref={inputRef}
                 label={label}
                 onInput={changeInput}/>
    </EditUserContent>
};

export default EditUser


const EditUserContent = styled.div`
  height: 100%;
  padding-top: 2%;
`

const UserInfoDetail = styled.div`
  padding: 2%;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items:  center;
  background-color: #FDFDFD;
  font-size: 15px;
  border-bottom: 0.5px solid #e9e9e9;
  .right {
    font-size: inherit;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 25px;
    }
    .icon {
      margin-left: 10px;
    }
  }
`

const SubmitButton = styled.div`
  background-color: ${props => props.theme.color};
  color: #fff;
  width: 90%;
  margin: 30px auto;
  border-radius: 8px;
  text-align: center;
  height: 45px;
  line-height: 45px;
  font-size: 16px;
`
