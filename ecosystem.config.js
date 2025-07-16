module.exports = {
  apps: [{
    name: 'api-express',
    script: './src/app.js',
    watch: true,
    env: {
      PORT: 3000
    }
  }]
};
