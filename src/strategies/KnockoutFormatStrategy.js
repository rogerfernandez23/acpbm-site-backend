const TournamentFormatStrategy = require("../rules/TournamentStrategyFormat");
const generateKnockoutMatches = require("../utils/generatorMatchesKnockout");

class KnockoutFormatStrategy extends TournamentFormatStrategy {
  generate(teams, phases) {
    const matches = [];
    const randomTeams = generateKnockoutMatches(teams);

    for (let i = 0; i < randomTeams.length; i += 2) {
      const home = randomTeams[i];
      const away = randomTeams[i + 1];
      const phase = phases[0];

      matches.push({ home, away, phase });
    }

    return matches;
  }

  generatePhases(teams) {
    const phases = [];
    const numberTeams = teams.length;

    const phasesTotal = Math.log2(numberTeams);

    for (let i = phasesTotal; i > 0; i--) {
      switch (i) {
        case 1:
          phases.push("Final");
          break;
        case 2:
          phases.push("Semifinais");
          break;
        case 3:
          phases.push("Quartas de Final");
          break;
        case 4:
          phases.push("Oitavas de Final");
          break;
        case 5:
          phases.push("16 avos de Final");
          break;
        case 6:
          phases.push("32 avos de Final");
          break;
        default:
          phases.push(`Fase ${i}`);
          break;
      }
    }

    return phases;
  }
}
module.exports = KnockoutFormatStrategy;
