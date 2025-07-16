const { exec } = require('child_process');

const SECRET = process.env.DEPLOY_SECRET || 'a98f3hT97hfd23HFh90+++ffd392_HFD';

exports.deploy = (req, res) => {
  const auth = req.headers['authorization'];

  // Comparación exacta
  if (!auth || auth !== `Bearer ${SECRET}`) {
    console.log('Auth recibido:', req.headers['authorization']);
    console.log('Clave esperada:', SECRET);
    return res.status(403).send('Acceso no autorizado');
  }

  const REPO_PATH = '/home/onesto/mi-portfolio';
  const DEST_PATH = '/var/www/portafolioN';
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
};
