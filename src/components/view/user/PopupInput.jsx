import React, {forwardRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Icon, Input, Popup} from 'zarm'
import styled from "@emotion/styled";

const PopupInput = forwardRef(({ onInput, label }, ref) => {
    const [show, setShow] = useState(false);

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    }

    return <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}>
        <PopupCenter>
            <ContainerHeader>
                请输入
                <Icon type="icon-close"
                      className={'cross'}
                      onClick={() => setShow(false)} />
            </ContainerHeader>
            <ContainerBody>
                <div className={'center'}>
                    <p className={'label'}>{label.name === 'username' ? '用户名' : '签名'}: </p>
                    <Input
                        clearable
                        className={'input'}
                        value={label.value}
                        type="text"
                        placeholder="请输入"
                        onChange={(value) => onInput({
                            value,
                            name: label.name
                        })}
                    />
                </div>
            </ContainerBody>
        </PopupCenter>
    </Popup>
});

PopupInput.propTypes = {
    onInput: PropTypes.func,  // 选择后的回调
    label: PropTypes.object,
}

export default PopupInput;


const PopupCenter= styled.div`
  background-color: #FFF;
  height: 200px;
`

const ContainerHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 56px;
  text-align: center;
  font-size: 14px;
  line-height: 56px;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fff;
  .cross {
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: 25px;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.6);
  }
`

const ContainerBody = styled.div`
  background-color: #f5f5f5;
  height: calc(200px - 56px);
  padding: 2%;
  .center {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    border-radius: 6px ;
    margin-top: 30px;
    background: #e8e8e8;
    .label {
      width: 20%;
      font-size: 13px;
    }
    .input {
      width: 45%;
    }
  }
`
