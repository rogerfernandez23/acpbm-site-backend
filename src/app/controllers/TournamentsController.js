const Yup = require("yup");
const Tournaments = require("../models/Tournaments.js");

class TournamentsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      year: Yup.number().required(),
      description: Yup.string().required().max(255),
      format: Yup.string().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date()
        .required()
        .min(
          Yup.ref("start_date"),
          "The end date must be later than the start date"
        ),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, year, description, format, start_date, end_date } = req.body;
    const { filename: path } = req.file;

    const tournamentExists = await Tournaments.findOne({
      where: { name, year },
    });

    if (tournamentExists) {
      return res.status(400).json({
        error: "A championship with that name and year already exists.",
      });
    }

    await Tournaments.create({
      name,
      year,
      description,
      format,
      path,
      start_date,
      end_date,
    });

    return res.status(200).json({ success: "Torneio criado com sucesso!" });
  }

  async index(req, res) {
    const tournament = await Tournaments.findAll();

    return res.status(200).json(tournament);
  }

  async show(req, res) {
    const { id } = req.params;
    const tournamentById = await Tournaments.findByPk(id);

    if (!tournamentById) {
      return res.status(401).json({ error: "campeonato não existe" });
    }

    return res.status(200).json(tournamentById);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      year: Yup.number().required(),
      description: Yup.string().required().max(255),
      start_date: Yup.date().required(),
      end_date: Yup.date()
        .required()
        .min(
          Yup.ref("start_date"),
          "The end date must be later than the start date"
        ),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const { name, year, description, start_date, end_date } = req.body;
    const { id } = req.params;

    const findExists = await Tournaments.findByPk(id);

    if (!findExists) {
      return res.status(401).json({ error: "campeonato não existe" });
    }

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    await Tournaments.update(
      {
        name,
        year,
        description,
        path,
        start_date,
        end_date,
      },
      {
        where: { id },
      }
    );

    return res
      .status(200)
      .json({ success: "campeonato atualizado com sucesso!" });
  }

  async delete(req, res) {
    const { id } = req.params;

    const tournamentExists = await Tournaments.findByPk(id);

    if (!tournamentExists) {
      return res.status(400).json({ error: "campeonato não existe" });
    }

    await Tournaments.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ success: "campeonato deletado com sucesso!" });
  }
}

module.exports = new TournamentsController();
