const express = require("express");
const cors = require('cors');
const routes = require("./routes.js");
const { resolve } = require('path');

require('./database/index.js');

class App {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(
      '/club-logo',
      express.static(resolve(__dirname, 'temp'))
    )
  }

  routes() {
    this.app.use(routes);
  }
}

module.exports = new App().app;

