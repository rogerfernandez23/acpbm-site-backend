const Standings = require("../models/Standings");

class StandingsController {
  async showStanding(req, res) {
    const { id: tournament_id } = req.params;

    const standing = await Standings.findAll({
      where: { tournament_id },
    });
    if (!standing) {
      return res.status(401).json({ error: "tabela não encontrada" });
    }

    return res.status(200).json(standing);
  }
}

module.exports = new StandingsController();
