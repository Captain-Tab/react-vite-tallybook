import React, {useEffect, useRef, useState} from 'react';
import TopBar from "../../components/layout/TopBar";
import styled from "@emotion/styled";
import qs from 'query-string';
import { get, post } from '../../plugin/request'
import { Modal, Toast } from "zarm";
import dayjs from "dayjs";
import CustomIcon from "../../components/common/CustomIcon";
import constVariable from "../../const";
import PopupAddBill from "../../components/view/bill/PopupAddBill";

const Detail = () => {
    const editRef = useRef();
    const [detail, setDetail] = useState({}); // 订单详情数据
    const { id } = qs.parse(location.search); // 查询字符串反序列化

    useEffect(async () => {
        await getDetail()
    }, []);


    // 获取账单详情
    const getDetail = async () => {
        const { data } = await get(`/api/bill/detail?id=${id}`);
        setDetail(data);
    }

    // 删除账单
    const deleteDetail = () => {
        Modal.confirm({
            title: '删除',
            content: '确认删除账单？',
            onOk: async () => {
                await post('/api/bill/delete', { id })
                Toast.show('删除成功')
                history.back()
            },
        });
    }

    return <DetailContent>
        <DetailCard>
            <div className={'type'}>
                {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}

                <div className={'iconfontContainer'}>
                    <CustomIcon className={'iconfont'}
                                type={detail.type_id ?
                                    constVariable.ICON_MAP[detail.type_id].icon : 1} />
                </div>
                <p>{ detail.type_name || '' }</p>
            </div>
            <div className={'amount'}>{ detail.pay_type === 1  ? '-' : '+'}{ detail.amount }</div>

            <div className={'info'}>
                <div className={'time'}>
                    <span>记录时间:</span>
                    <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
                </div>
                <div className={'remark'}>
                    <span className={'title'}>备注:</span>
                    <span>{ detail.remark || '-' }</span>
                </div>
            </div>
            <div className={'operation'}>
                <span onClick={deleteDetail}><CustomIcon type='icon-delete' />删除</span>
                <span onClick={() => editRef.current && editRef.current.show()}>
                    <CustomIcon type='icon-edit' />编辑</span>
            </div>
        </DetailCard>

        <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
    </DetailContent>
}

export default Detail

const DetailContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const DetailCard = styled.div`
  margin: 20px 10px 0 10px;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .type {
    padding: 24px 0 12px 0;
    font-size: 20px;
    display: flex;
    align-items: center;
    .iconfontContainer {
      background-color: ${props => props.theme.color};
      margin-right: 10px;
      padding: 10px;
      border-radius: 50%;
      .iconfont {
        font-size: 20px;
      }
    }
  }
  .amount {
    font-size: 24px;
    font-weight: 600;
    margin: 15px 0 30px 0;
  }
  .info {
    width: 75%;
    font-size: 15px;
    text-align: center;
    margin-bottom: 20px;
    .time {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 12px;
      span:nth-of-type(1) {
        flex: 3;
        color: rgba(0,0,0,0.5)
      }
      span:nth-of-type(2) {
        flex: 9;
      }
    }
    .remark {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 12px;
      .title {
        text-align: right;
      }
      span:nth-of-type(1) {
        flex: 3;
        color: rgba(0,0,0,0.5)
      }
      span:nth-of-type(2) {
        flex: 9;
        color: rgba(0,0,0,0.9)
      }
    }
  }
  .operation {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 16px;
    .van-icon {
      margin-right: 4px;
    }
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex: 1
    }
    span:nth-of-type(1) {
      color: red;
    }
  }
`
