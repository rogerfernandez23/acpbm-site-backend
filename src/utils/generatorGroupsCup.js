function generatorGroupsCup(teams, groupsNumber) {
  const groupSize = teams.length / groupsNumber;

  if (groupSize % 2 !== 0) {
    throw new Error("O número de times por grupo não é par");
  }

  const groups = Array.from({ length: groupsNumber }, () => []);

  for (let i = 0; i < teams.length; i++) {
    const groupIndex = Math.floor(i / groupSize);
    groups[groupIndex].push(teams[i]);
  }

  return groups;
}

module.exports = generatorGroupsCup;
