const { exec } = require('child_process');

exports.deploy = (req, res) => {
  const auth = req.headers.authorization;
  const secret = process.env.DEPLOY_SECRET;

  if (!auth || auth !== `Bearer ${secret}`) {
    return res.status(403).send('Unauthorized');
  }

  exec('cd /ruta/a/tu/portafolio && git pull origin main && npm install && npm run build', (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error: ${error.message}`);
      return res.status(500).send('Deploy failed');
    }
    if (stderr) console.warn(`⚠️ Stderr: ${stderr}`);

    console.log(`✅ Deploy output:\n${stdout}`);
    res.send('Deploy successful');
  });
};
