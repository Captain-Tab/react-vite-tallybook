import React from 'react';
import styled from "@emotion/styled";
import CustomIcon from "./CustomIcon";
import PropTypes from "prop-types";

const keyName = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '.',
    'hide',
]

const Keyboard = ({onKeyClick}) => {
    const keyChange = (key) => {
        onKeyClick(key)
    }

    return <Wrapper>
        <div className={'keyPad'}>
            { keyName.map((item,index)=> {
                return (<div key={index}
                             className={'item'}
                             onClick={()=> keyChange(item)}>
                    { item === 'hide' ? <CustomIcon type='icon-keyboard-hide'/> :  <p>{item}</p> }
                    </div>)
            })}
        </div>
        <div className={'operationPad'}>
            <CustomIcon type={'icon-remove'}
                        className={'operation remove'}
                        onClick={()=> keyChange('remove')}/>
            <CustomIcon type={'icon-ok'}
                        className={'operation ok'}
                        onClick={ ()=> keyChange('ok')} />
        </div>
    </Wrapper>
};

export default Keyboard;

Keyboard.propTypes = {
    onKeyClick: PropTypes.func, // 选择后的回调
}

const Wrapper = styled.div`
    display: flex;
    height: 220px;
    width: 100%;
  .keyPad {
    width: 75%;
    display: flex;
    flex-wrap: wrap;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2%;
      width: calc(100% / 3);
      user-select: none;
      cursor: pointer;
      border: 0.1PX solid #e9e9e9;
      text-align: center;
      font-weight: 400;
      font-size: 30px;
    }
    .item:active {
      background-color: #f0f0f0;;
    }
  }
  .operationPad {
    width: 25%;
    .operation {
      width: 100%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0.1PX solid #e9e9e9;
      font-size: 35px;
    }
    .remove:active {
      background-color: #f0f0f0;;
    }
    .ok {
      background-color: ${props => props.theme.color};
      color: white;
    }
    .ok:active {
      opacity: 0.8;
    }
  }
`

