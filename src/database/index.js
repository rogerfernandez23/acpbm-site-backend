import Sequelize from 'sequelize';
import Clubs from '../app/models/Clubs.js';
import Register from '../app/models/Register.js';
import configDatabase from '../config/database.cjs';

const models = [ Register, Clubs ];

class Database {
    constructor() {
        this.init()
    };

    init() {
        this.connection = new Sequelize(configDatabase);
        models.map((model) => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models));
    };
}

export default new Database();