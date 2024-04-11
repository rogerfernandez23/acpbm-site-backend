const { exec } = require('child_process');

const send = (name, email) => {

  const pathScript = require('../integrations/email_send.py');

  const nameUser = `"${name}"`;
  const emailUser = `"${email}"`;
  const path = `"${pathScript}"`;

  exec(`python ${path} ${nameUser} ${emailUser}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Erro ao enviar o e-mail: ${err}`)
      return
    }
    console.log(`Saída do script Python: ${stdout}`)
  })
};

module.exports = { send };


