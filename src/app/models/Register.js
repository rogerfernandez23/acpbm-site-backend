const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

class Register extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                admin: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );

        this.addHook('beforeSave', async (user) => {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 10)
            };
        });

        return this;
    };

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash)
    };

    static associate(models) {
        this.belongsTo(models.Clubs, {
            foreignKey: 'club_id',
            as: 'club'
        });
    }
};

module.exports = Register;
