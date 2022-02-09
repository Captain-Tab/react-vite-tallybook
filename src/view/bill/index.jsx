import React, {useEffect, useRef, useState} from 'react'
import {Icon, Pull} from "zarm";
import dayjs from 'dayjs'
import styled from "@emotion/styled";
import BillItem from "../../components/view/bill/BillItem";
import { get } from '/src/plugin/request'
import {LOAD_STATE, REFRESH_STATE} from "../../const";
import PopupType from "../../components/view/bill/PopupType";
import PopupDate from "../../components/view/bill/PopupDate";
import CustomIcon from "../../components/common/CustomIcon";
import PopupAddBill from "../../components/view/bill/PopupAddBill";
import EmptyPanel from "../../components/common/EmptyPanel";

const Bill = () => {
    const typeRef = useRef(); // 账单类型 ref
    const monthRef = useRef(); // 月份筛选 ref
    const addRef = useRef(); // 添加账单 ref
    const [totalExpense, setTotalExpense] = useState(0); // 总支出
    const [totalIncome, setTotalIncome] = useState(0); // 总收入
    const [currentSelect, setCurrentSelect] = useState({}); // 当前筛选类型
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM')); // 当前筛选时间
    const [page, setPage] = useState(1); // 分页
    const [list, setList] = useState([]); // 账单列表
    const [totalPage, setTotalPage] = useState(0); // 分页总数
    const [refreshing, setRefreshing] = useState(REFRESH_STATE.normal); // 下拉刷新状态
    const [loading, setLoading] = useState(LOAD_STATE.normal); // 上拉加载状态

    useEffect(() => {
        getBillList() // 初始化
    }, [page, currentSelect, currentTime])

    const getBillList = async () => {
        const { data } = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}&type_id=${currentSelect.id || 'all'}`);
        // 下拉刷新，重制数据
        if (page === 1) {
            setList(data.list);
        } else {
            setList(list.concat(data.list));
        }
        setTotalExpense(data.totalExpense.toFixed(2));
        setTotalIncome(data.totalIncome.toFixed(2));
        setTotalPage(data.totalPage);
        // 上滑加载状态
        setLoading(LOAD_STATE.success);
        setRefreshing(REFRESH_STATE.success);
    }

    // 请求列表数据
    const refreshData = () => {
        setRefreshing(REFRESH_STATE.loading);
        if (page !== 1) {
            setPage(1);
        } else {
            getBillList();
        }
    };

    const loadData = () => {
        if (page < totalPage) {
            setLoading(LOAD_STATE.loading);
            setPage(page + 1);
        }
    }

    // 添加账单弹窗
    const toggle = () => {
        typeRef.current && typeRef.current.show()
    };

    // 添加账单弹窗
    const addToggle = () => {
        addRef.current && addRef.current.show()
    }

    // 选择月份弹窗
    const monthToggle = () => {
        monthRef.current && monthRef.current.show()
    };

    // 筛选类型
    const select = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        setPage(1);
        setCurrentSelect(item)
    }
    // 筛选月份
    const selectMonth = (item) => {
        setRefreshing(REFRESH_STATE.loading);
        setPage(1);
        setCurrentTime(item)
    }

    return <BillLayout>
        <BillTop>
            <div className={'sum'}>
                <span>总支出：<b>¥ { totalExpense }</b></span>
                <span >总收入：<b>¥ { totalIncome }</b></span>
            </div>
            <div className={'billType'}>
                <div className={'item'} onClick={toggle}>
                    <span> { currentSelect.name || '全部类型' } <Icon type="icon-down-circle" className={'icon'} /></span>
                </div>
                <div className={'item'} onClick={monthToggle}>
                    <span>{ currentTime } <Icon type="icon-down-circle" className={'icon'} /></span>
                </div>
            </div>
        </BillTop>

        <BillContent >
            {
                list.length ? <Pull
                    animationDuration={200}
                    stayTime={400}
                    refresh={{
                        state: refreshing,
                        handler: refreshData
                    }}
                    load={{
                        state: loading,
                        distance: 200,
                        handler: loadData
                    }}
                >
                    {
                        list.map((item, index) => <BillItem
                            bill={item}
                            key={index}
                        />)
                    }
                </Pull> : <EmptyPanel />
            }
        </BillContent>

        <AddBill onClick={addToggle}>
            <CustomIcon type='icon-Note' />
        </AddBill>

        <PopupType ref={typeRef} onSelect={select} />
        <PopupDate ref={monthRef} mode="month" onSelect={selectMonth} />
        <PopupAddBill ref={addRef} onReload={refreshData} />

    </BillLayout>
}
export default Bill

const BillLayout = styled.div`
  width: 100%;
  height: 100%;
`

const BillTop = styled.div`
  font-size: 15px;
  background-color: ${props => props.theme.color};
  font-family: PingFangSC-Medium, PingFang SC, serif;
  opacity: 0.8;
  color: #fff;
  height: 100px;
  padding: 4%;
  position: relative;
  .sum {
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
  .billType {
    margin-top: 10px;
    display: flex;
    float: right;
    align-items: center;
    .item {
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

const BillContent = styled.div`
  height: calc((93% - 100px));
  overflow: hidden;
  overflow-y: scroll;
  background-color: #f9f9f9;
  padding: 0.26667rem;
`

const AddBill = styled.div`
    position: fixed;
    bottom: 100px;
    right: 30px;
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1PX solid #e9e9e9;
    color: ${props => props.theme.color};
`
