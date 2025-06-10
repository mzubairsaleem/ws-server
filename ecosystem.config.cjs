module.exports = {
  apps: [{
    script: 'ws-server',
    watch: false,
    autorestart: true,
    instances: -1, // Use -1 for cluster mode
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 9099
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 9099
    },
    log_date_format: 'YYYY-MM-DD HH:mm Z',
  }],

  deploy: {
    production: {
      user: 'root',
      host: ['91.99.74.62', '116.203.216.30', '116.203.150.214', '159.69.93.168', '91.99.140.74', '116.203.107.5'],
      ref: 'origin/main',
      repo: 'https://github.com/mzubairsaleem/ws-server.git',
      path: '/opt/wss-server',
      'pre-deploy': 'source ~/.nvm/nvm.sh && nvm use 16 && npm install -g pm2@latest',
      'post-deploy': 'source ~/.nvm/nvm.sh  && npm install && pm2 reload ecosystem.config.cjs --env production',
      'pre-setup': 'source ~/.nvm/nvm.sh && nvm use 16 && npm install -g pm2@latest && pm2 startup'
    }
  }
};
