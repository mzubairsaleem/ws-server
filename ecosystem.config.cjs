module.exports = {
  apps: [{
    name: 'ws-server',
    script: 'ws-server.js',
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
      host: ['178.156.128.242', '178.156.165.54', '5.161.242.149', '5.161.114.27'],
      ref: 'origin/main',
      repo: 'https://github.com/mzubairsaleem/ws-server.git',
      path: '/opt/wss-server',
      'pre-deploy': 'source ~/.nvm/nvm.sh',
      'post-deploy': 'source ~/.nvm/nvm.sh  && npm install && pm2 startOrRestart ecosystem.config.cjs --env production',
      'pre-setup': 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && source ~/.nvm/nvm.sh && nvm install 16 && nvm use 16 && npm install -g pm2@latest && pm2 startup'
    }
  }
};
