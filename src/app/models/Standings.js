const Sequelize = require("sequelize");

class Standings extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        club_id: Sequelize.INTEGER,
        tournament_id: Sequelize.INTEGER,
        phase_id: Sequelize.INTEGER,
        games: Sequelize.INTEGER,
        points: Sequelize.INTEGER,
        wins: Sequelize.INTEGER,
        draws: Sequelize.INTEGER,
        losses: Sequelize.INTEGER,
        points_pro: Sequelize.INTEGER,
        points_score: Sequelize.INTEGER,
        percent_points: Sequelize.INTEGER,
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

    this.belongsTo(models.Clubs, {
      foreignKey: "club_id",
      as: "clubs",
    });

    this.belongsTo(models.Phases, {
      foreignKey: "phase_id",
      as: "phases",
    });
  }
}

module.exports = Standings;
