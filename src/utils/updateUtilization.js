async function updateUtilization(tournament_id) {
  const standings = await Standings.findAll({
    where: { tournament_id },
  });

  standings.forEach(async (standing) => {
    const totalPointsPossible = standing.matches_played * 3;
    const pointsSuccess = standing.points / totalPointsPossible;

    await standing.update({
      percent_points: pointsSuccess,
    });
  });
}

module.exports = updateUtilization;
