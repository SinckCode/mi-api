module.exports = {
  apps: [
    {
      name: 'api-express',
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
