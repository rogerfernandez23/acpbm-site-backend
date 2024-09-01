const LeagueFormatStrategy = require("../../strategies/LeagueFormatStrategy");
const Matches = require("../models/Matches");

class GeneratedMatchesController {
  async generatedLeagueMatches(req, res) {
    try {
      const teams = await TeamsTournament.findAll();
      const leagueFormat = new LeagueFormatStrategy();

      const matches = await leagueFormat.generate(teams);
      await Matches.bulkCreate(matches);

      return res
        .status(200)
        .json({ message: "partidas geradas com sucesso!", matches });
    } catch (error) {
      return res.status(500).json({ error: "internal server error" });
    }
  }
}

module.exports = new GeneratedMatchesController();
