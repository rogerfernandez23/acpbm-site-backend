function generatorGroups(teams, groupsNumber) {
  const groupSize = teams.length / groupsNumber;

  if (groupSize % 2 !== 0) {
    return [];
  }

  const potDraw = [...teams];
  drawTeams(potDraw);

  const groups = Array.from({ length: groupsNumber }, () => []);

  for (let i = 0; i < potDraw.length; i++) {
    const groupIndex = Math.floor(i / groupSize);
    potDraw[i].group_name = `Grupo ${groupIndex + 1}`;

    groups[groupIndex].push(potDraw[i]);
  }

  return groups;
}

const drawTeams = (teams) => {
  for (let i = teams.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [teams[i], teams[j]] = [teams[j], teams[i]];
  }
};

module.exports = generatorGroups;
