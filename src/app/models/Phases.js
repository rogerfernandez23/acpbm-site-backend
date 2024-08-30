const Sequelize = require("sequelize");

class Phases extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
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

    this.hasMany(models.Rounds, {
      foreignKey: "phase_id",
      as: "rounds",
    });

    this.hasMany(models.Matches, {
      foreignKey: "phase_id",
      as: "matches",
    });
  }
}

module.exports = Phases;
