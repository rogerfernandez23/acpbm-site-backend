const { exec } = require('child_process');

const sendRecovery = (email, token) => {

    const emailRecovery = `"${email}"`;
    const tokenRecovery = `"${token}"`;

    exec(`python /app/src/integrations/recovery_send.py ${emailRecovery} ${tokenRecovery}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Erro ao enviar o e-mail: ${err}`)
            return
        }
        console.log(`Saída do script Python: ${stdout}`)
    })
};

module.exports = { sendRecovery };