const Yup = require("yup");
const Clubs = require("../models/Clubs.js");
const Matches = require("../models/Matches.js");
const Rounds = require("../models/Rounds.js");
const Phases = require("../models/Phases.js");
const Tournaments = require("../models/Tournaments.js");
const standingsRefresh = require("../../utils/standingsRefresh.js");

class MatchesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      home_team_id: Yup.string().required(),
      away_team_id: Yup.string().required(),
      tournament_id: Yup.number().required(),
      round_id: Yup.number().required(),
      phase_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const {
      home_team_id,
      away_team_id,
      tournament_id,
      round_id,
      phase_id,
      date,
    } = req.body;

    const homeTeamExist = await Clubs.findByPk(home_team_id);
    const awayTeamExist = await Clubs.findByPk(away_team_id);

    if (!homeTeamExist || !awayTeamExist) {
      return res
        .status(400)
        .json({ error: "um ou ambos clubes são inexistentes" });
    }

    const tournamentExists = await Tournaments.findByPk(tournament_id);
    const phaseExists = await Phases.findByPk(phase_id);
    const roundExists = await Rounds.findByPk(round_id);

    if (tournamentExists.status != "pending") {
      return res
        .status(400)
        .json({ error: "campeonato já iniciado ou concluído" });
    }

    if (!tournamentExists || !phaseExists || !roundExists) {
      return res
        .status(400)
        .json({ error: "campeonato, fase ou rodada inexistente" });
    }

    await Matches.create({
      home_team_id,
      away_team_id,
      tournament_id,
      round_id,
      phase_id,
      date,
    });

    return res.status(200).json({ success: "partida agendada com sucesso!" });
  }

  async savingResults(req, res) {
    const {
      id,
      home_team_id: home,
      away_team_id: away,
      home_team_score: homeScore,
      away_team_score: awayScore,
    } = req.body;
    const { id: tournament_id } = req.params;

    const matchExists = await Matches.findByPk(id);
    if (!matchExists) {
      return res.status(401).json({ error: "esta partida não existe!" });
    }

    await standingsRefresh(home, away, homeScore, awayScore, tournament_id);

    await Matches.update(
      {
        home_team_score: homeScore,
        away_team_score: awayScore,
      },
      {
        where: { id },
      }
    );

    return res
      .status(200)
      .json({ success: "resultado registrado com sucesso!" });
  }

  async index(req, res) {
    const matches = await Matches.findAll({
      include: [
        {
          model: Tournaments,
          as: "tournaments",
          attributes: ["name", "year", "status"],
        },
        {
          model: Phases,
          as: "phases",
          attributes: ["name"],
        },
        {
          model: Rounds,
          as: "rounds",
          attributes: ["number_round"],
        },
      ],
    });

    return res.status(200).json(matches);
  }

  async show(req, res) {
    const { id } = req.params;
    const matchesById = await Matches.findByPk(id, {
      include: [
        {
          model: Tournaments,
          as: "tournaments",
          attributes: ["name", "year", "status"],
        },
        {
          model: Phases,
          as: "phases",
          attributes: ["name"],
        },
        {
          model: Rounds,
          as: "rounds",
          attributes: ["number_round"],
        },
      ],
    });

    if (!matchesById) {
      return res.status(401).json({ error: "partida não criada" });
    }

    return res.status(200).json(matchesById);
  }

  async delete(req, res) {
    const { id } = req.params;
    const matchesData = await Matches.findByPk(id);

    if (matchesData.home_team_score != null) {
      return res.status(400).json({
        error: "partida já finalizada",
      });
    }

    const tournament_id = matchesData.tournament_id;
    const tournamentInProgress = await Tournaments.findByPk(tournament_id);

    const verifyStatus = tournamentInProgress.status;

    if (verifyStatus != "pending") {
      return res.status(400).json({
        error: "a partida pertence a um campeonato em andamento ou concluído",
      });
    }

    await Matches.destroy({
      where: { id },
    });

    return res.status(200).json({ success: "partida deletada com sucesso!" });
  }
}

module.exports = new MatchesController();
