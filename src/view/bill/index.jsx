import React from 'react'
import {Icon} from "zarm";
import styled from "@emotion/styled";

const BillTop = styled.div`
  font-size: 20px;
  background-color: ${props => props.theme.color};
`

const Bill = () => {
    return <div>
        <BillTop>
            <div>
                <span>总支出：<b>¥ 200</b></span>
                <span >总收入：<b>¥ 500</b></span>
            </div>
            <div>
                <div>
                    <span>类型 <Icon type="icon-down"/></span>
                </div>
                <div >
                    <span >2022-06<Icon type="icon-down" /></span>
                </div>
            </div>
        </BillTop>
    </div>
}
export default Bill
