import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import CustomIcon from "../../common/CustomIcon";
import constVariable from '../../../const/index'
import { navigate } from "hookrouter";
import styled from "@emotion/styled";

const BillCard = styled.div`
  border-radius: 0.26667rem;
  overflow: hidden;
  box-shadow: 0 0 0.10667rem 0 rgb(0 0 0 / 10%);
  margin-bottom: 0.26667rem;
`

const BillTime = styled.div`
    padding: 10px;
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    > .date {
      text-align: center;
      line-height: 40px;
    }
    >.total {
      > span {
        > .icon {
          margin-left: 10px;
          color: ${props => props.theme.color};
        }
        > .amount {
          margin-left: 5px;
          font-size: 13px;
        }
      }
    }
  }
`

const BillCell = styled(Cell)`
    .icon {
      color: ${props => props.theme.color};
      margin-right: 2px;
    }
`


const BillItem = ({ bill }) => {
    const [income, setIncome] = useState(0); // 收入
    const [expense, setExpense] = useState(0); // 支出

    const billDetail = () => {
        return (
            bill && bill.bills.map(item =>
                <BillCell
                key={item.id}
                onClick={() => goToDetail(item)}
                title={
                    <>
                        <CustomIcon
                            type={item.type_id ? constVariable.ICON_MAP[item.type_id].icon : 1}
                            className={'icon'}
                        />
                        <span>{ item.type_name }</span>
                    </>
                }
                description={<span style={{
                    color: item.pay_type === 2 ? '#F3000A' : '#37DB5A'
                }}>
                    {`${item.pay_type === 1 ? '-' : '+'}${item.amount}`}
                </span>}
                help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
            >
            </BillCell>)
        )
    }

    // 当添加账单是，bill.bills 长度变化，触发当日收支总和计算。
    useEffect(() => {
        // 初始化将传入的 bill 内的 bills 数组内数据项，过滤出支出和收入。
        // pay_type：1 为支出；2 为收入
        // 通过 reduce 累加
        const _income = bill.bills.filter(i => i.pay_type === 2).reduce((curr, item) => {
            curr += Number(item.amount);
            return curr;
        }, 0);
        setIncome(_income);
        const _expense = bill.bills.filter(i => i.pay_type === 1).reduce((curr, item) => {
            curr += Number(item.amount);
            return curr;
        }, 0);
        setExpense(_expense);
    }, [bill.bills]);

    // 前往账单详情
    const goToDetail = (item) => {
        navigate(`/detail?id=${item.id}`)
    };

    return <BillCard>
        <BillTime>
            <div className={'date'}>{bill.date}</div>
            <div className={'total'}>
                <span>
                    <CustomIcon type="icon-minus-circle"  className={'icon'}/>
                    <span className={'amount'}>¥{ expense.toFixed(2) }</span>
                </span>
                <span>
                  <CustomIcon type="icon-plus-circle" className={'icon'}/>
                  <span className={'amount'}>¥{ income.toFixed(2) }</span>
                </span>
            </div>
        </BillTime>
        { billDetail() }
    </BillCard>
};

BillItem.propTypes = {
    bill: PropTypes.object
};

export default BillItem;
