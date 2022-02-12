import React from 'react'
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
import Router from "./router";
import { ThemeProvider } from "@emotion/react";
import ErrorBoundary from 'react-error-boundaries'


// 主题变量
const theme = {
    color: '#F08830',
    light: '#F3000A'
}

function App() {
  const onError = (error, errorInfo, props) => {
      console.log('error', error, errorInfo, props)
  }

  return  (
      <ErrorBoundary onError={onError}>
          <ThemeProvider theme={theme}>
              <ConfigProvider primaryColor='#F08830' locale={zhCN}>
                  <Router />
              </ConfigProvider>
          </ThemeProvider>
      </ErrorBoundary>
  )
}

export default App
