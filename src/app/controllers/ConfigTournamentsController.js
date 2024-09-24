const Tournaments = require("../models/Tournaments");
const Clubs = require("../models/Clubs");
const TournamentClubs = require("../models/TournamentClubs");
const Phases = require("../models/Phases");
const Rounds = require("../models/Rounds");

const {
  standingsCreateLeague,
  standingsCreateCup,
} = require("../../utils/standingsTable");
const generatorGroups = require("../../utils/generatorCupGroups");
const KnockoutFormatStrategy = require("../../strategies/KnockoutFormatStrategy");

const { Op } = require("sequelize");

class ConfigTournamentsController {
  async addClubsLeague(req, res) {
    const { id: tournament_id } = req.params;
    const { club_id: clubId } = req.body;

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

    const clubs = clubId.map((club) => ({
      tournament_id,
      club_id: club,
    }));

    await standingsCreateLeague(clubs);

    await TournamentClubs.bulkCreate(clubs);

    return res.status(200).json({ success: "clubes adicionados com sucesso!" });
  }

  async addClubsCup(req, res) {
    const { id: tournament_id } = req.params;
    const clubsAndGroups = req.body;

    const tournamentExists = await Tournaments.findByPk(tournament_id);
    if (!tournamentExists) {
      return res.status(401).json({ error: "campeonato não existe" });
    }

    for (const group of clubsAndGroups) {
      const ids = group.club_id;

      const clubExists = await Clubs.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });

      if (clubExists.length !== ids.length) {
        return res
          .status(404)
          .json({ error: "um ou mais clubes não foram encontrados" });
      }
    }

    const clubs = clubsAndGroups.flatMap((group) =>
      group.club_id.map((id) => ({
        tournament_id,
        club_id: id,
        group_name: group.group_name,
      }))
    );

    await standingsCreateCup(clubs);

    await TournamentClubs.bulkCreate(clubs);

    return res.status(200).json({ success: "clubes adicionados com sucesso!" });
  }

  async addClubsKnockout(req, res) {
    const { id: tournament_id } = req.params;
    const { club_id: clubId } = req.body;

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

    const knockoutFormat = new KnockoutFormatStrategy();
    const phases = await knockoutFormat.generatePhases(clubExists);
    const rounds = await knockoutFormat.generateRounds(
      clubExists,
      tournament_id
    );

    for (const phaseName of phases) {
      await Phases.create({
        tournament_id,
        name: phaseName,
      });
    }

    const phasesTournamentId = await Phases.findAll({
      where: { tournament_id },
    });

    const phase = phasesTournamentId.map((phase) => phase.dataValues.id);

    const saveRounds = rounds.map((round, index) => ({
      ...round,
      phase_id: phase[index],
    }));

    await Rounds.bulkCreate(saveRounds);

    const clubs = clubId.map((club) => ({
      tournament_id,
      club_id: club,
    }));

    await TournamentClubs.bulkCreate(clubs);

    return res.status(200).json({ success: "clubes adicionados com sucesso!" });
  }

  async automatedGroupsCup(req, res) {
    const { id: groupsNumber } = req.params;
    const teams = req.body;

    const drawGroups = generatorGroups(teams, groupsNumber);

    if (drawGroups.length === 0) {
      return res.status(401).json({ error: "erro na geração do sorteio" });
    }

    return res.status(200).json(drawGroups);
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
