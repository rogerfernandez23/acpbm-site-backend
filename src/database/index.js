const Sequelize = require('sequelize');
const Clubs = require('../app/models/Clubs.js');
const Register = require('../app/models/Register.js');
const Forgot = require('../app/models/Forgot.js');
const configDatabase = require('../config/database.cjs');

const models = [Register, Clubs, Forgot];

class Database {
    constructor() {
        this.init()
    };

    init() {
        this.connection = new Sequelize(configDatabase.url);
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
    };
}

module.exports = new Database();
