const LeagueFormatStrategy = require("../../strategies/LeagueFormatStrategy");
const CupFormatStrategy = require("../../strategies/CupFormatStrategy");
const generatedRoundsLeague = require("../../utils/generatedRoundsLeague");
const Matches = require("../models/Matches");
const Phases = require("../models/Phases");
const Rounds = require("../models/Rounds");
const generatorCupGroups = require("../../utils/generatorCupGroups");
const generatedRoundsCup = require("../../utils/generatorRoundsCup");

class GeneratedTournamentController {
  async generatedLeagueMatches(req, res) {
    try {
      let phase = "Fase Única";
      const teams = req.body;
      const { id: tournament_id } = req.params;

      const leagueFormat = new LeagueFormatStrategy();

      const generatedMatches = await leagueFormat.generate(teams);

      const phaseExists = await Phases.findOne({
        where: { name: phase, tournament_id },
      });

      if (phaseExists) {
        return res.status(401).json({ error: "erro na geração de partidas" });
      }

      const createPhase = await Phases.create({
        name: phase,
        tournament_id,
      });

      const phase_id = createPhase.id;
      await generatedRoundsLeague(tournament_id, phase_id, teams);

      const roundsId = await Rounds.findAll({
        where: {
          tournament_id,
          phase_id,
        },
      });

      const round = roundsId.reduce((acc, round) => {
        acc[round.number_round] = round.id;
        return acc;
      }, {});

      const matches = generatedMatches
        .map((match) => {
          const round_id = round[match.round_number];

          if (!round_id) {
            return null;
          }

          return {
            ...match,
            tournament_id,
            phase_id,
            round_id,
            date: new Date(),
          };
        })
        .filter((match) => match !== null);

      await Matches.bulkCreate(matches);

      return res.status(200).json({ message: "partidas geradas com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "erro na geração de partidas!" });
    }
  }

  async generatedCupMatches(req, res) {
    let phase = "Fase de Grupos";
    const teams = req.body;
    const { id: tournament_id } = req.params;

    const cupFormat = new CupFormatStrategy();
    const generatedMatches = cupFormat.generate(teams);

    const phaseExists = await Phases.findOne({
      where: { name: phase, tournament_id },
    });

    if (phaseExists) {
      return res.status(401).json({ error: "erro na geração de partidas" });
    }

    const createPhase = await Phases.create({
      name: phase,
      tournament_id,
    });

    const phase_id = createPhase.id;
    await generatedRoundsCup(tournament_id, phase_id, teams);

    const roundsId = await Rounds.findAll({
      where: {
        tournament_id,
        phase_id,
      },
    });

    const round = roundsId.reduce((acc, round) => {
      acc[round.number_round] = round.id;
      return acc;
    }, {});

    const matches = generatedMatches
      .map((match) => {
        const round_id = round[match.round_number];

        if (!round_id) {
          return null;
        }

        return {
          ...match,
          tournament_id,
          phase_id,
          round_id,
          date: new Date(),
        };
      })
      .filter((match) => match !== null);

    await Matches.bulkCreate(matches);

    console.log(matches);
    return res.status(200).json({ success: "partidas geradas com sucesso!" });
  }
}

module.exports = new GeneratedTournamentController();
