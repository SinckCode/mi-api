module.exports = {
  apps: [
    {
      name: 'mi-api',
      script: 'src/app.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DEPLOY_SECRET: 'a98f3hT97hfd-23HFh90+ffd392_HFD'
      }
    }
  ]
};
