import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import styled from "@emotion/styled";

let chart = null
const Echart = ({type, data, style}) => {

    const initChart = () => {
        if(!echarts) {
            console.warn('创建失败，没有echart对象')
            return
        }
        if(type !== 'pie') {
            console.warn('目前只支持饼图')
            return;
        }
        chart = echarts.init(document.getElementById('charAnchor'))
        chart.setOption(data)
    }

    const destroyChart = () => {
        chart.dispose()
    }

    useEffect(()=> {
        initChart()
        return () => destroyChart()
    }, [data])

    return <Chart id={'charAnchor'} style={style}/>
};

export default Echart;

Echart.propTypes = {
    data: PropTypes.object, // 数据
    style: PropTypes.object // 样式
}

const Chart = styled.div`
  background-color: #fff;
  width: 100%;
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
