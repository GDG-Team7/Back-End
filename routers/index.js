const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

module.exports = (app) => {
  const routers = {};

  fs.readdirSync(__dirname)
    .filter(file => {
      return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach(file => {
      file = file.substr(0, file.length -3);

      //자동적으로 router파일의 이름을 경로로 하여 추가해줍니다.
      app.use(`/${file}`, require(`./${file}`));
      routers[file] = require(`./${file}`);
    });

  //custom 경로로 추가하는 경우
  //routers에서 가져와서 사용하면 됩니다.
  app.use("/", routers.helloWorld);
};