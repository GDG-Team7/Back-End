const fs = require("fs");
const controllers = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") === -1;
  })
  .forEach(file => {
    controllers[file] = require(`./${file}`);
  })

module.exports = controllers;