const { exec } = require('child_process');

const send = (name, email) => {

  const nameUser = `"${name}"`;
  const emailUser = `"${email}"`;

  exec(`python ../integrations/email_send.py ${nameUser} ${emailUser}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Erro ao enviar o e-mail: ${err}`)
      return
    }
    console.log(`Saída do script Python: ${stdout}`)
  })
};

module.exports = { send };


