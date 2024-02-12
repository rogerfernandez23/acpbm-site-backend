import Sequelize from "sequelize";
import Register from "../app/models/Register.js";
import configDatabase from '../config/database.cjs';

const models = [ Register ];

class Database {
    constructor(){
        this.init()
    }

    init(){
        this.conecction = new Sequelize(configDatabase);
        models.map( (model) => model.init(this.conecction));
    }
}

export default new Database();