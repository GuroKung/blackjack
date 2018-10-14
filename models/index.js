const fs = require("fs");
const path = require("path");
const basename = path.basename(module.filename);
const db = {};

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    const filename = file.slice(0, -3);
    db[filename] = model;
  });

module.exports = db;
