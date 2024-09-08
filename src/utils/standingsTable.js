const Standings = require("../app/models/Standings");
const tiebreakerCriteria = require("./tiebreakerCriteria");

async function standingsCreateLeague(clubs) {
  console.log(clubs);
  try {
    const standingsSave = clubs.map((info) => ({
      club_id: info.club_id,
      tournament_id: info.tournament_id,
    }));

    await Standings.bulkCreate(standingsSave);

    console.log("tabela criada com sucesso!");
  } catch (error) {
    console.log(error);
    console.log("erro na criação de tabela!");
  }
}

async function standingsCreateCup(clubs) {
  try {
    const standingsSave = clubs.map((info) => ({
      club_id: info.club_id,
      tournament_id: info.tournament_id,
      group_name: info.group_name,
    }));

    await Standings.bulkCreate(standingsSave);

    console.log("tabela criada com sucesso!");
  } catch (error) {
    console.log(error);
    console.log("erro na criação de tabela!");
  }
}

async function refreshPhaseId(phase_id, tournament_id) {
  const refresh = await Standings.findByPk(tournament_id);

  if (!refresh) {
    return { error: "Torneio não encontrado." };
  }

  await Standings.update(
    {
      phase_id,
    },
    {
      where: { tournament_id },
    }
  );
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

module.exports = {
  standingsTable,
  standingsCreateLeague,
  standingsCreateCup,
  refreshPhaseId,
};
