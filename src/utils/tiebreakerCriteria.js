function tiebreakerCriteria(teams) {
  return teams.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    if (a.wins !== b.wins) return b.wins - a.wins;
    if (a.proPoints !== b.proPoints) return b.proPoints - a.proPoints;
    if (a.points !== b.points) return b.points - a.points;

    if (a.confront[b.id] === "win") return -1;
    if (b.confront[a.id] === "win") return -1;

    return 0;
  });
}

module.exports = tiebreakerCriteria;
