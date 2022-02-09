module.exports = {
    apps: [
        {
            name: 'react-vite-tallybook',
            script: 'vite-h5-tallybook.js'
        },
    ],
    deploy: {
        production: {
            user: 'root',
            host: '49.235.126.217',
            ref: 'origin/master',
            repo: 'https://github.com/Captain-Tab/react-vite-tallybook',
            path: '/root/workplace/react-vite-tallybook',
            'post-deploy': 'git reset --hard && git checkout master && git pull && npm i --production=false && npm run build:release && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
            env: {
                NODE_ENV: 'production'
            }
        }
    }
}
