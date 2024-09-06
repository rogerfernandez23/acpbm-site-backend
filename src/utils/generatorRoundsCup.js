const Rounds = require("../app/models/Rounds");

async function generatedRoundsCup(tournament_id, phase_id, teams) {
  const groupCount = teams.map((team) => team.group_name);
  const names = new Set(groupCount);
  const number = names.size;
  const teamsGroup = teams.length / number;

  let totalRounds = (teamsGroup - 1) * 2;
  let matchCount = teamsGroup / 2;

  try {
    for (let numberRound = 1; numberRound <= totalRounds; numberRound++) {
      await Rounds.create({
        number_round: numberRound,
        match_count: matchCount,
        tournament_id,
        phase_id,
        group_name: teams.group_name,
      });
    }

    console.log("Partidas e rodadas geradas com sucesso!");
  } catch (error) {
    console.log(error);
    console.log("Erro na geração de rodadas!");
  }
}

module.exports = generatedRoundsCup;
