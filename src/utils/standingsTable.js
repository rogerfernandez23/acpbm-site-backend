const Standings = require("../app/models/Standings");

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

function standingsReturn(standings) {
  console.log(standings);
  const classification = standings.map((team, index) => {
    return {
      POS: index + 1,
      id: team.dataValues.club_id,
      Clube: team.dataValues.clubs.club_name,
      Pontos: team.dataValues.points,
      Vitórias: team.dataValues.wins,
      Empates: team.dataValues.draw,
      Derrotas: team.dataValues.losses,
      PontosPró: team.dataValues.points_pro,
      SaldoPontos: team.dataValues.points_score,
      Aproveitamento: team.dataValues.percent_points,
      Grupo: team.dataValues.group_name,
    };
  });

  return JSON.stringify(classification, null, 2);
}

module.exports = {
  standingsReturn,
  standingsCreateLeague,
  standingsCreateCup,
  refreshPhaseId,
};
