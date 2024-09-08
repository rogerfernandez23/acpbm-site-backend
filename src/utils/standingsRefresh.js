const Standings = require("../app/models/Standings");

async function standingsRefresh(
  home,
  away,
  homeScore,
  awayScore,
  tournament_id
) {
  try {
    const clubExists = await Standings.findAll({
      where: {
        club_id: [home, away],
        tournament_id,
      },
    });

    const homeClub = clubExists.find((s) => s.club_id === home);
    const awayClub = clubExists.find((s) => s.club_id === away);

    if (!homeClub || !awayClub) {
      throw new Error("clubes não encontrados");
    }

    if (homeScore > awayScore) {
      homeClub.wins += 1;
      homeClub.points += 3;
      awayClub.losses += 1;
    } else if (homeScore < awayScore) {
      awayClub.wins += 1;
      awayClub.points += 3;
      homeClub.losses += 1;
    } else {
      homeClub.draws += 1;
      awayClub.draws += 1;
      homeClub.points += 1;
      awayClub.points += 1;
    }

    homeClub.games += 1;
    homeClub.points_pro += homeScore;
    homeClub.points_score += homeScore - awayScore;

    awayClub.games += 1;
    awayClub.points_pro += awayScore;
    awayClub.points_score += awayScore - homeScore;

    await homeClub.save();
    await awayClub.save();

    return {
      success: true,
      message: "Classificações atualizadas com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
}

module.exports = standingsRefresh;
