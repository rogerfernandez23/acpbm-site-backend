const { Sequelize } = require("sequelize");

class TournamentClubs extends Sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        tournament_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Tournaments",
            key: "id",
          },
          allowNull: false,
        },
        club_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Clubs",
            key: "id",
          },
          allowNull: false,
        },
        group_name: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "TournamentClubs",
        tableName: "tournament_clubs",
        timestamps: false,
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
  }
}

module.exports = TournamentClubs;
