const Yup = require("yup");
const Tournaments = require("../models/Tournaments.js");
const Phases = require("../models/Phases.js");

class PhasesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      tournament_id: Yup.number().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, tournament_id } = req.body;

    const tournamentExists = await Tournaments.findByPk(tournament_id);

    if (!tournamentExists) {
      return res.status(400).json({ error: "campeonato não existe" });
    }

    await Phases.create({
      name,
      tournament_id,
    });

    return res.status(200).json({ success: "Fase registrada com sucesso!" });
  }

  async index(req, res) {
    const phases = await Phases.findAll({
      include: [
        {
          model: Tournaments,
          as: "tournaments",
          attributes: ["name", "year", "status"],
        },
      ],
    });

    return res.status(200).json(phases);
  }

  async show(req, res) {
    const { id } = req.params;
    const phasesById = await Phases.findByPk(id, {
      include: [
        {
          model: Tournaments,
          as: "tournaments",
          attributes: ["name", "year", "status"],
        },
      ],
    });

    if (!phasesById) {
      return res.status(401).json({ error: "fase não registrada" });
    }

    return res.status(200).json(phasesById);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name } = req.body;
    const { id } = req.params;

    const findExists = await Phases.findByPk(id);

    if (!findExists) {
      return res.status(401).json({ error: "fase não registrada" });
    }

    await Phases.update({ name }, { where: { id } });

    return res.status(200).json({ success: "fase atualizada com sucesso!" });
  }

  async delete(req, res) {
    const { id } = req.params;
    const phaseDate = await Phases.findByPk(id);

    const tournament_id = phaseDate.tournament_id;
    const tournamentInProgress = await Tournaments.findByPk(tournament_id);

    const verifyStatus = tournamentInProgress.status;

    if (verifyStatus != "pending") {
      return res.status(400).json({
        error: "a fase partence a um campeonato em andamento ou concluído",
      });
    }

    await Phases.destroy({
      where: { id },
    });

    return res.status(200).json({ success: "fase deletada com sucesso!" });
  }
}

module.exports = new PhasesController();
