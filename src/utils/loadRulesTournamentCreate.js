const fs = require("fs");
const path = require("path");

const loadRulesTournamentCreate = (filename) => {
  const filePath = path.resolve(__dirname, `../rules/${filename}`);
  const rawData = fs.readFileSync(filePath);

  return JSON.parse(rawData);
};

module.exports = {
  loadTournamentsTypes: () =>
    loadRulesTournamentCreate("tournamentsTypes.json"),
};
