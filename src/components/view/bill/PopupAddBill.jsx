import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popup, Icon, Keyboard, Input, Toast  } from 'zarm';
import dayjs from 'dayjs';
import { get, post } from '../../../plugin/request';
import CustomIcon from "../../common/CustomIcon";
import PopupDate from "./PopupDate";
import constVariable from "../../../const";
import styled from "@emotion/styled";

const PopupAddBill = forwardRef(({ detail = {}, onReload }, ref) => {
    const dateRef = useRef()
    const id = detail && detail.id // 外部传进来的账单详情 id
    const [show, setShow] = useState(false);
    const [payType, setPayType] = useState('expense'); // 支出或收入类型
    const [expense, setExpense] = useState([]); // 支出类型数组
    const [income, setIncome] = useState([]); // 收入类型数组
    const [currentType, setCurrentType] = useState({});
    const [amount, setAmount] = useState(''); // 账单价格
    const [remark, setRemark] = useState(''); // 备注
    const [showRemark, setShowRemark] = useState(false); // 备注输入框
    const [date, setDate] = useState(new Date()); // 日期

    useEffect(() => {
        if (detail.id) {
            setPayType(detail.pay_type === 1 ? 'expense' : 'income')
            setCurrentType({
                id: detail.type_id,
                name: detail.type_name
            })
            setRemark(detail.remark)
            setAmount(detail.amount)
            setDate(dayjs(Number(detail.date)).$d)
        }
    }, [detail])

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true);
            },
            close: () => {
                setShow(false);
            }
        }
    };

    useEffect(async () => {
        const { data: { list } } = await get('/api/type/list');
        const _expense = list.filter(i => i.type === 1); // 支出类型
        const _income = list.filter(i => i.type === 2); // 收入类型
        setExpense(_expense);
        setIncome(_income);
        // 没有 id 的情况下，说明是新建账单。
        if (!id) {
            setCurrentType(_expense[0]);
        };
    }, []);

    // 切换收入还是支出
    const changeType = (type) => {
        setPayType(type);
        // 切换之后，默认给相应类型的第一个值
        if (type === 'expense') {
            setCurrentType(expense[0]);
        } else {
            setCurrentType(income[0]);
        }
    };

    // 日期弹窗
    const handleDatePop = () => {
        dateRef.current && dateRef.current.show()
    }

    // 日期选择回调
    const selectDate = (val) => {
        setDate(val)
    }

    // 选择账单类型
    const choseType = (item) => {
        setCurrentType(item)
    }

    // 监听输入框改变值
    const handleMoney = async (value) => {
        console.log('cal', value)
        value = String(value)
        // 点击是删除按钮时
        if (value === 'delete') {
            let _amount = amount.slice(0, amount.length - 1)
            setAmount(_amount)
            return
        }
        // 点击确认按钮时
        if (value === 'ok') {
            await addBill()
            return
        }
        // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
        if (value === '.' && amount.includes('.')) return
        // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
        if (value !== '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return
        // amount += value
        setAmount(amount + value)
    }

    // 添加账单
    const addBill = async () => {
        if (!amount) {
            Toast.show('请输入具体金额')
            return
        }
        const params = {
            amount: Number(amount).toFixed(2),
            type_id: currentType.id,
            type_name: currentType.name,
            date: dayjs(date).unix() * 1000,
            pay_type: payType === 'expense' ? 1 : 2,
            remark: remark || ''
        }
        if (id) {
            params.id = id;
            // 如果有 id 需要调用详情更新接口
            await post('/api/bill/update', params);
            Toast.show('修改成功');
        } else {
            await post('/api/bill/add', params);
            setAmount('');
            setPayType('expense');
            setCurrentType(expense[0]);
            setDate(new Date());
            setRemark('');
            Toast.show('添加成功');
        }
        setShow(false);
        if (onReload) onReload();
    }

    return <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}>
        <PopupContent>
            {/* 右上角关闭弹窗 */}
            <header className={'header'}>
                <span
                    className={'close'}
                    onClick={() => setShow(false)}>
                    <CustomIcon type="icon-close" />
                </span>
            </header>
            {/* 「收入」和「支出」类型切换 */}
            <PopupFilter>
                <div className={'type'}>
                    <span onClick={() => changeType('expense')} className={cx({ expense: true, active: payType === 'expense' })}>支出</span>
                    <span onClick={() => changeType('income')} className={cx({ income: true, active: payType === 'income' })}>收入</span>
                </div>
                <div className={'time'}
                    onClick={() => dateRef.current && dateRef.current.show()}>
                    {dayjs(date).format('MM-DD')}
                    <Icon type="icon-down-circle" className={'arrow'}/>
                </div>
            </PopupFilter>

            <PopupAmount>
                    <span>¥</span>
                    <span className={cx('amount', 'animation')}>{amount}</span>
            </PopupAmount>

            <PopupType>
                <div className={'body'}>
                    {/* 通过 payType 判断，是展示收入账单类型，还是支出账单类型 */}
                    {
                        (payType === 'expense' ? expense : income).map(
                            item =>
                                <div onClick={() => setCurrentType(item)}
                                     key={item.id}
                                     className={'item'}>
                                {/* 收入和支出的字体颜色，以及背景颜色通过 payType 区分，并且设置高亮 */}
                                    <span className={cx({
                                        picked: true,
                                        expense: payType === 'expense',
                                        income: payType === 'income',
                                        active: currentType.id === item.id})}>
                                        <CustomIcon
                                            className={'iconfont'}
                                            type={constVariable.ICON_MAP[item.id].icon} />
                                    </span>
                                    <span>{item.name}</span>
                                </div>)
                    }
                </div>
            </PopupType>

            <PopupRemark>
                {
                    showRemark ? <Input
                        autoHeight
                        showLength
                        maxLength={50}
                        type="text"
                        rows={3}
                        value={remark}
                        placeholder="请输入备注信息"
                        onChange={(val) => setRemark(val)}
                        onBlur={() => setShowRemark(false)}
                    /> : <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
                }
            </PopupRemark>

            <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
            <PopupDate ref={dateRef} onSelect={selectDate} />

        </PopupContent>
    </Popup>
})

export default PopupAddBill

const PopupContent = styled.div`
  padding-top: 12px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  .header {
    padding: 0 16px;
    .close {
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`

const PopupFilter = styled.div`
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .type {
    span {
      display: inline-block;
      background: #f5f5f5;
      color: rgba(0, 0, 0, 0.5);
      padding: 4px 12px;
      font-size: 12px;
      border-radius: 24px;
      border: 1px solid #f5f5f5;
    }
    .expense {
      margin-right: 6px;
      &.active {
        background-color: #fbf8f0;
        border-color: ${props => props.theme.color};
        color: ${props => props.theme.color};
      }
    }
    .income {
      &.active {
        background-color: #fbf8f0;
        border-color: ${props => props.theme.color};
        color: ${props => props.theme.color};
      }
    }
  }
  .time {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 12px;
    background-color: #f0f0f0;
    border-radius: 20px;
    color: rgba(0, 0, 0, 0.9);
    .arrow {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  }
`

const PopupAmount = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 24px;
  .sufix {
    font-size: 36px;
    font-weight: bold;
    vertical-align: top;
  }
  .amount {
    font-size: 40px;
    padding-left: 10px;
  }
`

const PopupType = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0 24px 20px 0;
  * {
    touch-action: pan-x;
  }
  .body {
    display: flex;
    white-space: nowrap;
    >.item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 16px 12px 10px 12px;
      .picked {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-bottom: 5px;
        .iconfont {
          color: rgba(0, 0, 0, 0.5);
          font-size: 20px;
        }
      }
      .expense {
        &.active {
          background-color: ${props => props.theme.color};
          .iconfont {
            color: #fff;
          }
        }
      }
      .income {
        &.active {
          background-color: ${props => props.theme.color};
          .iconfont {
            color: #fff;
          }
        }
      }
    }
  }
`

const PopupRemark = styled.div`
  padding: 0 24px 12px 24px;
  color: ${props => props.theme.light};
  :global {
    .za-input--textarea {
      border: 1px solid #e9e9e9;
      padding:  10px;
    }
  }
`
