const app = require('./app.js');
const { Router } = require('express');

const routes = Router();

const port = process.env.PORT || 8080;

app.listen(port);

routes.get('/', (req, res) => {
    return res.json({sucess: 'Servidor iniciado!! 🚀'})
})


