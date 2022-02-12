import React, { useEffect, useRef, useState } from 'react'
import styled from "@emotion/styled";
import CustomIcon from "@/components/common/CustomIcon";
import PopupInput from "@/components/view/user/PopupInput";
import { FilePicker, Toast } from "zarm";
import { navigate } from "hookrouter";
import { convertImgUrl } from "../../../helper";
import { fetchUserInfo, updateUserInfo, uploadFile } from "@/fetch";

const EditUser = () => {
    const inputRef = useRef(); // 输入类型 ref
    const [label, setLabel] = useState({
        name: '',
        value: ''
    })
    const [user, setUser] = useState({
        avatar: '',
        username: '',
        signature: '',
        nickname: ''
    })

    // 获取用户信息
    const getUserInfo = async () => {
        const { data } = await fetchUserInfo()
        setUser(data)
    }

    // 显示输入弹窗
    const showInput = (label) => {
        setLabel(label)
        inputRef.current && inputRef.current.show()
    }

    // 获取图片回调
    const handleSelect = async (file) => {
        if (file && file.file.size > 200 * 1024) {
            Toast.show('上传头像不得超过 200 KB！！')
            return
        }
        let formData = new FormData()
        // 生成 form-data 数据类型
        formData.append('file', file.file)
        const { data } = await uploadFile(formData)
        setUser({
            ...user,
            avatar: convertImgUrl(data)
        })
    }

    // 获取输入内容
    const changeInput = (label) => {
        setLabel(label)
        label.name === 'nickname' ?
        setUser({
            ...user,
            nickname: label.value
        }) :
        setUser({
            ...user,
            signature: label.value
        })
    }

    // 更新用户信息
    const submit = async () => {
        await updateUserInfo(user);
        Toast.show('修改用户成功');
        navigate('/user')
    }

   // 获取用户信息
    useEffect(() => {
        getUserInfo();
    }, []);

    return <EditUserContent>
    <UserInfoDetail>
        <p>用户名</p>
        <div className={'right'}>
            <p>{ user.username }</p>
        </div>
    </UserInfoDetail>

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
        name: 'nickname',
        value: user.nickname
    })}>
        <p>昵称</p>
        <div className={'right'}>
            <p>{ user.nickname }</p>
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
