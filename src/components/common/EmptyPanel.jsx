import React from 'react';
import styled from "@emotion/styled";
import CustomIcon from "./CustomIcon";

const EmptyPanel = () => {

    return <EmptyContainer>
        <CustomIcon type='icon-cry' className={'icon'}/>
        <p>暂无更多数据...</p>
    </EmptyContainer>
};

export default EmptyPanel;

const EmptyContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .icon {
    font-size: 100px;
    color: gray;
  }
  p {
    margin-top: 20px;
    color: gray;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-size: 14px;
  }
`
