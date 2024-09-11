function generateKnockoutMatches(teams) {
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [teams[i], teams[j]] = [teams[j], teams[i]];
  }

  return teams;
}

module.exports = generateKnockoutMatches;
