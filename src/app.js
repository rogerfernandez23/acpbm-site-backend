const express = require("express");
const cors = require('cors');
const routes = require("./routes.js");
const { resolve } = require('path');

require('./database/index.js');

const corsConfig = {
  origin: ['https://facpbm.netlify.app' || 'http://localhost:3000'],
  credentials: true,
}
class App {
  constructor() {
    this.app = express();
    this.app.use(cors(corsConfig));
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/club-logo',
      express.static(resolve(__dirname, 'uploads'))
    )
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;

