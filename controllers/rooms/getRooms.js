const { room, Sequelize } = require("../../models");
module.exports = async (req, res) => {
  const { member_limit, end_time, language } = req.query;

  try {
    const findOptions = {};

    if (member_limit) {
      findOptions["member_limit"] = member_limit;
    }
    if (language) {
      findOptions["language"] = language;
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