const express = require("express");
const cors = require('cors');
const routes = require("./routes.js");
const { resolve } = require('path');

require('./database/index.js');

const corsConfig = {
  origin: 'https://facpbm.netlify.app',
  credentials: true,
}
<<<<<<< HEAD

=======
>>>>>>> 5440cf286316f7aa8ce876ecf44c200fe82fb88b
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

