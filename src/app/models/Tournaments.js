const Sequelize = require("sequelize");

class Tournaments extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        year: Sequelize.INTEGER,
        status: Sequelize.STRING,
        description: Sequelize.STRING(255),
        format: Sequelize.STRING,
        path: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:8080/tournament-logo/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Matches, {
      foreignKey: "tournament_id",
      as: "matches",
    });

    this.hasMany(models.Rounds, {
      foreignKey: "tournament_id",
      as: "rounds",
    });

    this.hasMany(models.Phases, {
      foreignKey: "tournament_id",
      as: "phases",
    });
  }
}

module.exports = Tournaments;
