const Sequelize = require("sequelize");

class Rounds extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        number_round: Sequelize.INTEGER,
        match_count: Sequelize.INTEGER,
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

    this.belongsTo(models.Phases, {
      foreignKey: "phase_id",
      as: "phases",
    });

    this.hasMany(models.Matches, {
      foreignKey: "round_id",
      as: "matches",
    });
  }
}

module.exports = Rounds;
