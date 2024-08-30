const Yup = require("yup");
const Rounds = require("../models/Rounds.js");
const Tournaments = require("../models/Tournaments.js");
const Phases = require("../models/Phases.js");

class RoundsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      number_round: Yup.number().required(),
      match_count: Yup.number().required().min(0),
      tournament_id: Yup.number().required(),
      phase_id: Yup.number().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { number_round, match_count, tournament_id, phase_id } = req.body;

    const tournamentExists = await Tournaments.findByPk(tournament_id);
    const phaseExists = await Phases.findByPk(phase_id);

    if (!tournamentExists || !phaseExists) {
      return res.status(400).json({ error: "campeonato ou fase inexistente" });
    }

    const roundsExists = await Rounds.findOne({
      where: { number_round, tournament_id, phase_id },
    });

    if (roundsExists) {
      return res.status(400).json({
        error: "Essa rodada já foi criada",
      });
    }

    await Rounds.create({
      number_round,
      match_count,
      tournament_id,
      phase_id,
    });

    return res.status(200).json({ success: "Rodada criada com sucesso!" });
  }

  async index(req, res) {
    const rounds = await Rounds.findAll({
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
      ],
    });

    return res.status(200).json(rounds);
  }

  async show(req, res) {
    const { id } = req.params;
    const roundsById = await Rounds.findByPk(id, {
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
      ],
    });

    if (!roundsById) {
      return res.status(401).json({ error: "rodada não criada" });
    }

    return res.status(200).json(roundsById);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      number_round: Yup.number(),
      match_count: Yup.number().min(0),
      tournament_id: Yup.number(),
      phase_id: Yup.number(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { id } = req.params;
    const { number_round, match_count, tournament_id, phase_id } = req.body;

    const tournamentExists = await Tournaments.findByPk(tournament_id);
    const phaseExists = await Phases.findByPk(phase_id);

    if (!tournamentExists || !phaseExists) {
      return res.status(400).json({ error: "campeonato ou fase inexistente" });
    }

    const roundsExists = await Rounds.findOne({
      where: { number_round, tournament_id, phase_id },
    });

    if (roundsExists) {
      return res.status(400).json({
        error: "Essa rodada já foi criada",
      });
    }

    await Rounds.update(
      {
        number_round,
        match_count,
        tournament_id,
        phase_id,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({ success: "rodada atualizada com sucesso!" });
  }

  async delete(req, res) {
    const { id } = req.params;
    const roundsData = await Rounds.findByPk(id);

    const tournament_id = roundsData.tournament_id;
    const tournamentInProgress = await Tournaments.findByPk(tournament_id);

    const verifyStatus = tournamentInProgress.status;

    if (verifyStatus != "pending") {
      return res.status(400).json({
        error: "a rodada partence a um campeonato em andamento ou concluído",
      });
    }

    await Rounds.destroy({
      where: { id },
    });

    return res.status(200).json({ success: "rodada deletada com sucesso!" });
  }
}

module.exports = new RoundsController();
