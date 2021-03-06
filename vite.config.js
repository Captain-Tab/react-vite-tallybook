import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import styleImport from 'vite-plugin-style-import'
import path from 'path';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    reactRefresh(),
    styleImport(
        {
          libs: [
            {
              libraryName: 'zarm',
              esModule: true,
              resolveStyle: (name) => {
                return `zarm/es/${name}/style/css`;
              }
            }
          ]
        }
    )
  ],

  css: {
        modules: {
            localsConvention: 'dashesOnly'
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,   // 支持内联 JavaScript
            }
        }
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // src 路径
            // 'utils': path.resolve(__dirname, 'src/utils') // src 路径
        }
    },

    server: {
        proxy: {
            '/proxy': {
                // 当遇到 /proxy 路径时，将其转换成 target 的值
                target: 'http://127.0.0.1:7001',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/proxy/, '') // 将 /proxy 重写为空
            }
        }
    }
})
