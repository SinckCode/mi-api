const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

const SECRET = 'a98f3hT97hfd23FHh90+++ffd392_HFD';

router.post('/deploy', (req, res) => {
  const auth = req.headers['authorization'];
  if (!auth || !auth.includes(SECRET)) {
    return res.status(403).send('Acceso no autorizado');
  }

  const REPO_PATH = '/home/onesto/mi-portfolio';
  const DEST_PATH = '/var/www/portafolio';
  const USE_PM2 = false;

  const commands = [
    `cd ${REPO_PATH}`,
    'git pull origin main',
    'npm install',
    'npm run build',
    `rm -rf ${DEST_PATH}/*`,
    `cp -r build/* ${DEST_PATH}`,
    USE_PM2 ? 'pm2 restart portafolio' : 'echo "Sin pm2, no se reinicia nada"',
  ];

  const fullCommand = commands.join(' && ');

  exec(fullCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ ERROR:\n${error.message}`);
      return res.status(500).send(`Error en deploy:\n${error.message}`);
    }

    console.log(`✅ STDOUT:\n${stdout}`);
    if (stderr) console.warn(`⚠️ STDERR:\n${stderr}`);
    res.send(`✔️ Despliegue exitoso:\n${stdout}`);
  });
});

module.exports = router;
