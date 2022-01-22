import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Cell } from 'zarm';
import CustomIcon from "../../common/CustomIcon";
import iconMap from "../../../const/iconMap";
import {navigate} from "hookrouter";



const BillItem = ({ bill }) => {
    const [income, setIncome] = useState(0); // 收入
    const [expense, setExpense] = useState(0); // 支出


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

    return <div >
        <div >
            <div>{bill.date}</div>
            <div >
        <span>
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt='支' />
            <span>¥{ expense.toFixed(2) }</span>
        </span>
                <span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
          <span>¥{ income.toFixed(2) }</span>
        </span>
            </div>
        </div>
        {
            bill && bill.bills.map(item => <Cell
                key={item.id}
                onClick={() => goToDetail(item)}
                title={
                    <>
                        {/*<CustomIcon*/}
                        {/*    type={item.type_id ? iconMap[item.type_id].icon : 1}*/}
                        {/*/>*/}
                        <span>{ item.type_name }</span>
                    </>
                }
                description={<span style={{ color: item.pay_type === 2 ? 'red' : '#39be77' }}>{`${item.pay_type === 1 ? '-' : '+'}${item.amount}`}</span>}
                help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
            >
            </Cell>)
        }
    </div>
};

BillItem.propTypes = {
    bill: PropTypes.object
};

export default BillItem;
