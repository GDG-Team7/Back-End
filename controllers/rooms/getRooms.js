const { room, Sequelize } = require("../../models");
module.exports = async (req, res) => {
  const { member_limit, language } = req.query;
  let { annual_min, annual_max } = req.query;

  try {
    const findOptions = {};

    findOptions["end_time"] = {};
    findOptions["end_time"][Sequelize.Op.gte] = Date.now();
    if (member_limit) {
      findOptions["member_limit"] = member_limit;
    }
    if (language) {
      findOptions["language"] = language;
    }
    if (annual_min || annual_max) {
      if (!annual_min) annual_min = 0;
      if (!annual_max) annual_max = 100;
      findOptions[Sequelize.Op.and] = [
        { annual_min: {[Sequelize.Op.gte]: annual_min} },
        { annual_max: {[Sequelize.Op.lte]: annual_max} },
      ];
    }

    const rooms = await room.findAll({
      where: findOptions,
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({ rooms });
  } catch (err) {
    console.log(
      "-------------------------------Error occurred in room/getRooms.js-------------------------------- \n",
      err,
      "-------------------------------Error occurred in room/getRooms.js-------------------------------- \n"
    );
    res.status(500).send();
  }
};