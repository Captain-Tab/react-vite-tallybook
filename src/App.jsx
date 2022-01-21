import React from 'react'
import routeComponents from "./router";
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'

function App() {
  return  (
      <ConfigProvider primaryColor='#007fff' locale={zhCN}>
        {  routeComponents() }
      </ConfigProvider>
  )
}

export default App
