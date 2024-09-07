const Standings = require("../app/models/Standings");
const tiebreakerCriteria = require("./tiebreakerCriteria");

async function standingsCreate(clubId, tournament_id) {
  try {
    const standingsSave = clubId.map((team) => ({
      club_id: team,
      tournament_id,
    }));

    await Standings.bulkCreate(standingsSave);

    console.log("tabela criada com sucesso!");
  } catch (error) {
    console.log(error);
    console.log("erro na criação de tabela!");
  }
}

function standingsTable(teams) {
  const classificationTeams = tiebreakerCriteria(teams);

  const classification = classificationTeams.map((team, index) => {
    return {
      position: index + 1,
      id: team.id,
      name: team.name,
      points: team.points,
      wins: team.wins,
      draw: team.draw,
      lose: team.lose,
      proPoints: team.proPoints,
      pointsScored: team.pointsScored,
      utilization: team.utilization,
    };
  });

  return JSON.stringify(classification, null, 2);
}

module.exports = { standingsTable, standingsCreate };
