import React from 'react'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
import Router from "./router";

function App() {
  return  (
      <ConfigProvider primaryColor='#F08830' locale={zhCN}>
        <Router />
      </ConfigProvider>
  )
}

export default App
