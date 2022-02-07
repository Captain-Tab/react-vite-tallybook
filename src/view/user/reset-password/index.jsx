import React from 'react'
import styled from "@emotion/styled";
import { Cell, Input, Toast} from "zarm";
import { createForm } from "rc-form";
import { post } from "../../../plugin/request";

const Reset = (props) => {
    // Account 通过 createForm 高阶组件包裹之后，可以在 props 中获取到 form 属性
    const { getFieldProps, getFieldError } = props.form;

    const submit = () => {
        // validateFields 获取表单属性元素
        props.form.validateFields(async (error, value) => {
            if(error) {
                Toast.show('请完成所有输入信息')
                return
            }
            if (value.newpass !== value.newpass2) {
                Toast.show('请输入一致的新密码');
                return
            }
            const res = await post('/api/user/reset', {
                old_pass: value.oldpass,
                new_pass: value.newpass,
            })
            Toast.show(res.msg)
        });
    }

    return <ResetContent>
            <ResetForm>
                <Cell title="原密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入原密码"
                        {...getFieldProps('oldpass', { rules: [{ required: true }] })}
                    />
                </Cell>
                <Cell title="新密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请输入新密码"
                        {...getFieldProps('newpass', { rules: [{ required: true }] })}
                    />
                </Cell>
                <Cell title="确认密码">
                    <Input
                        clearable
                        type="text"
                        placeholder="请再此输入新密码确认"
                        {...getFieldProps('newpass2', { rules: [{ required: true }] })}
                    />
                </Cell>
            </ResetForm>

        <div className={'submit'} onClick={submit}>提交</div>
    </ResetContent>
}

const ResetContent = styled.div`
  height: 100%;
  position: relative;
  .submit {
    background-color: ${props => props.theme.color};
    color: #fff;
    width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    text-align: center;
    height: 45px;
    line-height: 45px;
    font-size: 16px;
  }
`

const ResetForm = styled.div`
  position: relative;
  margin-bottom: 40px;
`

export default createForm()(Reset);
