const fs = require("fs");
const path = require("path");

const loadRules = (filename) => {
  const filePath = path.resolve(__dirname, `../rules/${filename}`);
  const rawData = fs.readFileSync(filePath);

  return JSON.parse(rawData);
};

module.exports = {
  loadTournamentsTypes: () => loadRules("tournamentsTypes.json"),
};
