const Rounds = require("../app/models/Rounds");

async function generatedRoundsLeague(tournament_id, phase_id, teams) {
  try {
    let totalRounds = (teams.length - 1) * 2;
    let matchCount = teams.length / 2;

    let total = teams.filter((team) => team.name !== "off");

    if (total.length % 2 !== 0) {
      totalRounds = teams.length * 2;
      matchCount = Math.floor(teams.length / 2) - 1;
    }

    for (let numberRound = 1; numberRound <= totalRounds; numberRound++) {
      await Rounds.create({
        number_round: numberRound,
        match_count: matchCount,
        tournament_id,
        phase_id,
      });
    }

    console.log("Partidas e rodadas geradas com sucesso!");
  } catch (error) {
    console.log(error);
    console.log("Erro na geração de rodadas!");
  }
}

module.exports = generatedRoundsLeague;
