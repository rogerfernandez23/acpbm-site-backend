const Sequelize = require('sequelize');

class Forgot extends Sequelize.Model {
    static init(sequelize) {
        super.init(
        {
            email: Sequelize.STRING,
            token: Sequelize.STRING,
        },
        {
            sequelize,
        }
    );

    return this;
}
};

module.exports = Forgot;