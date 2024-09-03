const Tournaments = require("../models/Tournaments");
const Clubs = require("../models/Clubs");
const TournamentClubs = require("../models/TournamentClubs");

class ConfigTournamentsController {
  async addClubs(req, res) {
    const { id: tournament_id } = req.params;
    const { club_id: clubId, group_name } = req.body;

    const tournamentExists = await Tournaments.findByPk(tournament_id);
    if (!tournamentExists) {
      return res.status(401).json({ error: "campeonato não existe" });
    }

    const clubExists = await Clubs.findAll({
      where: {
        id: clubId,
      },
    });

    if (clubExists.length !== clubId.length) {
      return res
        .status(404)
        .json({ error: "um ou mais clubes não foram encontrados" });
    }

    const insertingClubs = clubId.map((club) => ({
      tournament_id,
      club_id: club,
      group_name,
    }));

    await TournamentClubs.bulkCreate(insertingClubs);

    return res.status(200).json({ success: "clubes adicionados com sucesso!" });
  }

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
