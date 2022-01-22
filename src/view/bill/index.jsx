import React, {useState} from 'react'
import {Icon} from "zarm";
import styled from "@emotion/styled";
import BillItem from "../../components/view/view/BillItem";

const BillTop = styled.div`
  font-size: 15px;
  background-color: ${props => props.theme.color};
  font-family: PingFangSC-Medium, PingFang SC, serif;
  opacity: 0.8;
  color: #fff;
  height: 100px;
  padding: 4%;
  position: relative;
  > .sum {
    span {
      font-size: 18px;
      b {
        font-family: DINCondensed-Bold,DINCondensed, serif;
        margin-left: 5px;
        font-size: 30px;
      }
    }
    span:last-child {
      margin-left: 15px;
    }
  }
  > .billType {
    margin-top: 10px;
    display: flex;
    float: right;
    align-items: center;
    > .item {
      background: rgba(0,0,0,.1);
      border-radius: 0.8rem;
      padding: 0.08rem 0.21333rem;
      font-size: .32rem;
      margin-left: 20px;
      .icon {
        font-size: 15px !important;
      }
    }
  }
`

const Bill = () => {

    const [list, setList] = useState([
        {
            bills: [
                {
                    amount: "25.00",
                    date: "1623390740000",
                    id: 911,
                    pay_type: 1,
                    remark: "",
                    type_id: 1,
                    type_name: "餐饮"
                }
            ],
            date: '2021-06-11'
        }
    ]); // 账单列表


    return <div>
        <BillTop>
            <div className={'sum'}>
                <span>总支出：<b>¥ 200</b></span>
                <span >总收入：<b>¥ 500</b></span>
            </div>
            <div className={'billType'}>
                <div className={'item'}>
                    <span>类型 <Icon type="icon-down-circle" className={'icon'} /></span>
                </div>
                <div className={'item'}>
                    <span>2022-06 <Icon type="icon-down-circle" className={'icon'} /></span>
                </div>
            </div>
        </BillTop>

        <div >
            {
                list.map((item, index) => <BillItem key={index} bill={item} />)
            }
        </div>


    </div>
}
export default Bill
