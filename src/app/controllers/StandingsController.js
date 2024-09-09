const Standings = require("../models/Standings");
const Clubs = require("../models/Clubs");
const tiebreakerCriteria = require("../../utils/tiebreakerCriteria");

class StandingsController {
  async showStanding(req, res) {
    const { id: tournament_id } = req.params;

    const teams = await Standings.findAll({
      where: { tournament_id },
      order: [
        ["points", "DESC"],
        ["points_pro", "DESC"],
        ["wins", "DESC"],
      ],
      include: [
        {
          model: Clubs,
          as: "clubs",
          attributes: ["club_name"],
        },
      ],
    });
    if (!teams) {
      return res.status(401).json({ error: "tabela não encontrada" });
    }

    const standing = await tiebreakerCriteria(teams, tournament_id);

    return res.status(200).send(standing);
  }
}

module.exports = new StandingsController();
