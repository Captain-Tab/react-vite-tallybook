import React, { useEffect, useRef, useState } from 'react';
import {Cell, Icon, Progress} from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import { get } from '../../plugin/request'
import styled from "@emotion/styled";
import PopupDate from "../../components/view/bill/PopupDate";
import CustomIcon from "../../components/common/CustomIcon";
import constVariable from "../../const";

let proportionChart = null;

const Statics = () => {
    const monthRef = useRef();
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM')); // 当前月份
    const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
    const [totalExpense, setTotalExpense] = useState(0); // 总支出
    const [totalIncome, setTotalIncome] = useState(0); // 总收入
    const [expenseData, setExpenseData] = useState([]); // 支出数据
    const [incomeData, setIncomeData] = useState([]); // 收入数据
    const [pieType, setPieType] = useState('expense'); // 饼图的「收入」和「支出」控制

    useEffect( () => {
        getData();
        return () => {
            // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
            // proportionChart.dispose();
        };
    }, [currentMonth]);

    // useEffect(() => {
    //     showContent()
    // }, [totalType])

    // 获取数据详情
    const getData = async () => {
        const { data } = await get(`/api/bill/data?date=${currentMonth}`);

        setTotalExpense(data.total_expense);
        setTotalIncome(data.total_income);

        // 过滤支出和收入
        const expense_data = data.total_data.filter(item => item.pay_type === 1).sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
        const income_data = data.total_data.filter(item => item.pay_type === 2).sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
        setExpenseData(expense_data);
        setIncomeData(income_data);

        // 绘制饼图
        // setPieChart(pieType === 'expense' ? expense_data : income_data);
    };

    // 月份弹窗开关
    const monthShow = () => {
        monthRef.current && monthRef.current.show();
    };

    const selectMonth = (item) => {
        setCurrentMonth(item);
    };

    // 切换收支构成类型
    const changeTotalType = (type) => {
        setTotalType(type);
    };

    // 切换饼图收支类型
    const changePieType = (type) => {
        setPieType(type);
        // 重绘饼图
        // setPieChart(type === 'expense' ? expenseData : incomeData);
    }

    const progressList = () => {
        const listData = totalType === 'expense'? expenseData : incomeData
        return (
            listData.map((item, index)=> {
                return <div key={index} className={'item'}>
                    <div className={'iconArea'}>
                        <CustomIcon
                            type={item.type_id ? constVariable.ICON_MAP[item.type_id].icon : 1}
                            className={'icon'}
                            theme='primary'
                        />
                    </div>

                    <p className={'name'}> { item.type_name } </p>
                    <p className={'amount'}> ¥{ Number(item.number).toFixed(2) || 0 } </p>

                    <div className={'progressArea'}>
                        <Progress
                            shape="line"
                            percent={Number((item.number / Number(totalType === 'expense' ? totalExpense : totalIncome)) * 100).toFixed(2)}
                            theme='primary'
                        />
                    </div>

                </div>
            }))
    }

    // 绘制饼图方法
    // const setPieChart = (data) => {
    //     if (echarts) {
    //         proportionChart = echarts.init(document.getElementById('proportion'));
    //         proportionChart.setOption({
    //             tooltip: {
    //                 trigger: 'item',
    //                 formatter: '{a} <br/>{b} : {c} ({d}%)'
    //             },
    //             // 图例
    //             legend: {
    //                 data: data.map(item => item.type_name)
    //             },
    //             series: [
    //                 {
    //                     name: '支出',
    //                     type: 'pie',
    //                     radius: '55%',
    //                     data: data.map(item => {
    //                         return {
    //                             value: item.number,
    //                             name: item.type_name
    //                         }
    //                     }),
    //                     emphasis: {
    //                         itemStyle: {
    //                             shadowBlur: 10,
    //                             shadowOffsetX: 0,
    //                             shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                         }
    //                     }
    //                 }
    //             ]
    //         })
    //     };
    // };

    return <StaticsContent>
        <StaticsSum>
            <div className={'time'} onClick={monthShow}>
                <span>{ currentMonth }</span><Icon type="date" className={'date'} />
            </div>
            <div className={cx({
                'sum': true,
                'tab-1': totalType === 'expense',
                'tab-2': totalType === 'income'})}>

                <StaticsAmount onClick={() => changeTotalType('expense')}>
                    <h3>总支出</h3>
                    <p>¥ { totalExpense }</p>
                </StaticsAmount>
                <StaticsAmount
                    onClick={() => changeTotalType('income')}>
                    <h3>总收入</h3>
                    <p>¥ { totalIncome }</p>
                </StaticsAmount>
            </div>
        </StaticsSum>

        <StaticsChart>
            <ProgressArea>
                <h3 className={'title'}>账单组成</h3>
                { progressList() }
            </ProgressArea>

        </StaticsChart>

        <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
    </StaticsContent>
}

export default Statics

const StaticsContent = styled.div`
  height: 93%;
  background-color: #f5f5f5;;
`

const StaticsSum = styled.div`
  background-color: #fff;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0 20px 0;
  margin-bottom: 10px;
  .time {
    position: relative;
    width: 100px;
    padding: 6px;
    background-color: #f5f5f5;
    color: rgba(0, 0, 0, .9);
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    span {
      font-weight: bolder;
    }
    span:nth-of-type(1)::after {
      content: '';
      position: absolute;
      top: 9px;
      bottom: 8px;
      right: 28px;
      width: 1px;
      background-color: rgba(0, 0, 0, .5);
    }
    .date {
      font-size: 16px;
      color: ${props => props.theme.color};
    }
  }
  .sum {
    width: 100%;
    display: flex;
    justify-content: space-around;
    text-align: center;
    position: relative;
  }
  .sum::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: calc((50% - 100px) / 2);
    height: 4px;
    width: 100px;
    background-color: ${props => props.theme.color};
    transition: transform 0.2s;
  }
  .tab-1::after {
    transform: translateX(0);
  }
  .tab-2::after {
    transform: translateX(calc(100vw / 2));
  }
`

const StaticsAmount = styled.div`
    width: 30%;
    position: relative;
    animation: transform 1s;
      h3 {
        font-size: 15px;
        margin-bottom: 10px;
      }
      p {
        font-family: DINCondensed-Bold,DINCondensed,serif;
        color: ${props => props.theme.color};
        font-size: 20px;
      }
`

const StaticsChart = styled.div`
    padding: 4%;
    height: calc(93% - 110px);
    background-color: #fff;
    overflow-y: scroll;
`

const ProgressArea = styled.div`
    .title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 50px;
      .iconArea {
        // background-color: ${props => props.theme.color};
        background-color: #f5f5f5;
        padding: 6px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .name {
        font-size: 14px;
      }
      .amount {
        font-size: 14px;
        margin: 0 20px;
      }
      .progressArea {
        width: 50%;
      }
    }
`
