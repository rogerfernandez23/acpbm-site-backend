const TournamentFormatStrategy = require("../rules/TournamentStrategyFormat");

class CupFormatStrategy extends TournamentFormatStrategy {
  generate(teams) {
    const matches = [];
    const groups = {};

    teams.forEach((team) => {
      if (!groups[team.group_name]) {
        groups[team.group_name] = [];
      }
      groups[team.group_name].push(team);
    });

    function roundCreate(n) {
      return [1, 4, 2, 5, 3, 6, 3, 6, 2, 5, 1, 4];
    }

    for (const groupName in groups) {
      const groupTeams = groups[groupName];
      const teamsNumber = groupTeams.length;

      const roundOrder = roundCreate(teamsNumber);
      let roundIndex = 0;

      for (let i = 0; i < teamsNumber - 1; i++) {
        for (let j = i + 1; j < teamsNumber; j++) {
          matches.push({
            home_team_id: groupTeams[i].id,
            away_team_id: groupTeams[j].id,
            round_number: roundOrder[roundIndex % roundOrder.length],
            group_name: groupName,
          });
          roundIndex++;

          matches.push({
            home_team_id: groupTeams[j].id,
            away_team_id: groupTeams[i].id,
            round_number: roundOrder[roundIndex % roundOrder.length],
            group_name: groupName,
          });
          roundIndex++;
        }
      }
    }

    return matches;
  }
}

module.exports = CupFormatStrategy;
