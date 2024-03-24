const Sequelize = require('sequelize');

class Clubs extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                club_name: Sequelize.STRING,
                club_user: Sequelize.STRING,
                abreviate_name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `https://backendacpbm.vercel.app/club-logo/${this.path}`
                    }
                }
            },
            {
                sequelize,
            }
        );

        return this;
    }
};

module.exports = Clubs;
