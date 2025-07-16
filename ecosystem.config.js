module.exports = {
  apps: [
    {
      name: 'mi-api',
      script: 'app.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
