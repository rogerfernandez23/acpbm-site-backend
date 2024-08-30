const Tournaments = require("../models/Tournaments");

class ConfigTournamentsController {
  async changeTournamentStatus(req, res) {
    const { id } = req.params;

    const searchTournament = await Tournaments.findByPk(id);

    if (!searchTournament) {
      return res.status(401).json({ error: "campeonato não existe" });
    }

    if (searchTournament.status === "pending") {
      await Tournaments.update(
        {
          status: "in progress",
        },
        {
          where: { id },
        }
      );
    } else {
      await Tournaments.update(
        {
          status: "finished",
        },
        {
          where: { id },
        }
      );
    }

    return res
      .status(200)
      .json({ success: "alterações realizadas com sucesso!" });
  }
}

module.exports = new ConfigTournamentsController();
