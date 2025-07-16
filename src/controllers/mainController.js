const { exec } = require('child_process');

exports.deploy = (req, res) => {
  const auth = req.headers.authorization;
  const secret = process.env.DEPLOY_SECRET;

  // Verificación de token
  if (!auth || auth !== `Bearer ${secret}`) {
      console.error('❌ Acceso no autorizado');
  console.warn('🔒 auth header recibido:', req.headers.authorization);
  console.warn('🔒 secreto esperado:', expectedToken);
  return res.status(403).send('Unauthorized');
  }

  // Ruta real del portafolio
  const commands = `
    cd /home/onesto/portafolioN &&
    git pull origin main &&
    npm install &&
    npm run build
  `;

  exec(commands, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error al ejecutar comandos: ${error.message}`);
      return res.status(500).send('Deploy failed');
    }

    if (stderr) console.warn(`⚠️ STDERR:\n${stderr}`);
    console.log(`✅ STDOUT:\n${stdout}`);

    res.send('✅ Deploy successful');
  });
};
