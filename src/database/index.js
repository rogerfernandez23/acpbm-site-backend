const Sequelize = require('sequelize');
const Clubs = require('../app/models/Clubs.js');
const Register = require('../app/models/Register.js');
const configDatabase = require('../config/database.js');

const models = [Register, Clubs];

class Database {
    constructor() {
        this.init()
    };

    init() {
        this.connection = new Sequelize(configDatabase);
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
    };
}

module.exports = new Database();
