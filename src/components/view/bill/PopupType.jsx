import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm'
import styled from "@emotion/styled";
import cx from 'classnames'
import { fetchBillType } from "../../../fetch";

const PopupType = forwardRef(({ onSelect }, ref) => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState('all');
    const [expense, setExpense] = useState([]);
    const [income, setIncome] = useState([]);

    useEffect(async () => {
        // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
        const { data: { list } } = await fetchBillType()
        setExpense(list.filter(i => i.type === 1))
        setIncome(list.filter(i => i.type === 2))
    }, [])

    if (ref) {
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    }

    const choseType = (item) => {
        setActive(item.id)
        setShow(false)
        onSelect(item)
    };

    return <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}>
        <PopupTypeContainer>
            <ContainerHeader>
                请选择类型
                <Icon type="icon-close"
                      className={'cross'}
                      onClick={() => setShow(false)} />
            </ContainerHeader>
            <ContainerContent>
                <div
                    className={cx({ 'all': true, 'active': active === 'all' })}
                    onClick={() => choseType({ id: 'all' })} >
                    全部类型
                </div>
                <div className={'title'}>支出</div>
                <div className={'expense-wrap'}>
                    {
                        expense.map((item, index) =>
                            <p key={index}
                               className={cx({'active': active === item.id})}
                               onClick={() => choseType(item)} >{ item.name }
                            </p>)
                    }
                </div>
                <div className={'title'}>收入</div>
                <div className={'income-wrap'}>
                    {
                        income.map((item, index) =>
                            <p key={index}
                               className={cx({'active': active === item.id})}
                               onClick={() => choseType(item)}  >{ item.name }
                            </p>)
                    }
                </div>
            </ContainerContent>
        </PopupTypeContainer>
    </Popup>
});

PopupType.propTypes = {
    onSelect: PropTypes.func
}

export default PopupType;


const PopupTypeContainer = styled.div`
  height: 500px;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px; 
`

const ContainerHeader = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 56px;
  text-align: center;
  font-size: 14px;
  line-height: 56px;
  color: rgba(0, 0, 0, 0.9);
  background-color: #fff;
  .cross {
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: 25px;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.6);
  }
`

const ContainerContent= styled.div`
  height: calc(500px - 56px);
  padding: 20px;
  overflow: scroll;
  .all {
    display: inline-block;
    padding: 12px 20px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.9);
    background-color: #fff;
  }
  .title {
    color: rgba(0, 0, 0, 0.9);
    margin: 10px 0;
    font-size: 16px;
  }
  .expense-wrap, .income-wrap {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    p {
      width: calc((100% - 40px) / 3);
      text-align: center;
      padding: 12px 0;
      margin: 0 10px 15px 0;
      background-color: #fff;
      font-size: 16px;
    }
  }
  .active {
    background-color: ${props => props.theme.color} !important;
    color: #fff;
  }
`
