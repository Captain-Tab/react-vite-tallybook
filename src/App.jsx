import React from 'react'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
import Router from "./router";
import {ThemeProvider} from "@emotion/react";

// 主题变量
const theme = {
    color: '#F08830',
    light: '#37DB5A'
}

function App() {
  return  (
    <ThemeProvider theme={theme}>
        <ConfigProvider primaryColor='#F08830' locale={zhCN}>
            <Router />
        </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
