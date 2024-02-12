import Sequelize, { Model } from "sequelize";

class Clubs extends Model {
    static init(sequelize) {
        super.init(
            {
                club_name: Sequelize.STRING,
                club_user: Sequelize.STRING,
                path: Sequelize.STRING,
                url: Sequelize.VIRTUAL,
            },
            {
                sequelize,
            }
        );
    }
};

export default new Clubs;