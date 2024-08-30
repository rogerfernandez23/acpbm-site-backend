const Sequelize = require("sequelize");

class Matches extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        home_team_score: Sequelize.INTEGER,
        away_team_score: Sequelize.INTEGER,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Tournaments, {
      foreignKey: "tournament_id",
      as: "tournaments",
    });

    this.belongsTo(models.Rounds, {
      foreignKey: "round_id",
      as: "rounds",
    });

    this.belongsTo(models.Phases, {
      foreignKey: "phase_id",
      as: "phases",
    });
  }
}

module.exports = Matches;
