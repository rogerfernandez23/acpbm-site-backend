function generatorGroups(teams, groupsNumber) {
  const groupSize = teams.length / groupsNumber;

  if (groupSize % 2 !== 0) {
    throw new Error("O número de times por grupo não é par");
  }

  const potDraw = [...teams];
  drawTeams(potDraw);

  const groups = Array.from({ length: groupsNumber }, () => []);

  for (let i = 0; i < potDraw.length; i++) {
    const groupIndex = Math.floor(i / groupSize);
    groups[groupIndex].push(potDraw[i]);
  }

  console.log(groups);

  return groups;
}

const drawTeams = (teams) => {
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [teams[i], teams[j]] = [teams[j], teams[i]];
  }
};

module.exports = generatorGroups;
