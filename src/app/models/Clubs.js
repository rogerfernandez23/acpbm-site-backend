import Sequelize, { Model } from 'sequelize';

class Clubs extends Model {
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
                        return `http://localhost:8080/club-logo/${this.path}`
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

export default Clubs;