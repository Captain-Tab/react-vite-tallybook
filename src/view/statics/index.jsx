import React, { useEffect, useRef, useState } from 'react';
import { Icon, Progress } from 'zarm';
import cx from 'classnames';
import dayjs from 'dayjs';
import styled from "@emotion/styled";
import PopupDate from "../../components/view/bill/PopupDate";
import CustomIcon from "../../components/common/CustomIcon";
import constVariable from "../../const";
import EmptyPanel from "../../components/common/EmptyPanel";
import { getMonthData } from "../../fetch";
import Echart from "@/components/common/Echart";

const Statics = () => {
    const monthRef = useRef();
    const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM')); // 当前月份
    const [totalType, setTotalType] = useState('expense'); // 收入或支出类型
    const [validData, setValidData] = useState(true)
    const [totalExpense, setTotalExpense] = useState(0); // 总支出
    const [totalIncome, setTotalIncome] = useState(0); // 总收入
    const [chartData, setChartData] = useState({}); // 图表数据
    const [expenseData, setExpenseData] = useState([]); // 支出数据
    const [incomeData, setIncomeData] = useState([]); // 收入数据

    useEffect(()=> {
        const data = totalType === 'expense' ? expenseData : incomeData
        const chartOption = {
            tooltip: {
                trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            // 图例
            legend: {
                data: data.map(item => item.type_name)
            },
            series: [
                {
                    name: '支出',
                    type: 'pie',
                    radius: '55%',
                    data: data.map(item => {
                        return {
                            value: item.number,
                            name: item.type_name
                        }
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        setChartData(chartOption)
    },[totalType, expenseData, incomeData ])

    useEffect( async() => {
        await getData();
    }, [currentMonth]);

    useEffect(()=> {
        const data = totalType === 'expense' ?  totalExpense : totalIncome;
        setValidData(data > 0 )
    }, [totalType, totalExpense, totalIncome])


    // 获取数据详情
    const getData = async () => {
        const { data } = await getMonthData(currentMonth);

        setTotalExpense(data.total_expense);
        setTotalIncome(data.total_income);

        // 过滤支出和收入
        const expense_data = data.total_data.filter(item => item.pay_type === 1).sort((a, b) => b.number - a.number); // 过滤出账单类型为支出的项
        const income_data = data.total_data.filter(item => item.pay_type === 2).sort((a, b) => b.number - a.number); // 过滤出账单类型为收入的项
        setExpenseData(expense_data);
        setIncomeData(income_data);
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

    const ProgressBar = () => {
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

        <StaticsChart show={validData}>
            <div className={'chartArea'}>
                <ProgressArea>
                    <ProgressBar />
                </ProgressArea>

                <Echart type='pie'
                        data={chartData}
                        style={{height: '400px'}}/>
            </div>

            <div className={'empty'}>
                <EmptyPanel />
            </div>

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
    .chartArea {
      height: 600px;
      display: ${props => props.show ? 'block': 'none'};
    }
    .empty {
      display: ${props => props.show ? 'none': 'block'};
      width: 100%;
      height: 100%;
    }
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
        width: 70px;
        margin: 0 10px;
      }
      .progressArea {
        width: 50%;
      }
    }
`

const PiechartArea = styled.div`
  background-color: #fff;
  padding: 12px;
  width: 100%;
  height: 400px;
  margin-top: 20px;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    .title {
      font-size: 18px;
      color: rgba(0, 0, 0, .9);
    }
    .tab {
      span {
        display: inline-block;
        width: 40px;
        height: 24px;
        background-color: #f5f5f5;
        text-align: center;
        line-height: 24px;
        margin-left: 10px;
        border-radius: 4px;
      }
    }
  }
`
