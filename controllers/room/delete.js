const { room } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params["room_id"];
  try {
    const roomInfo = await room.destroy({
      where: {
        id
      }
    });

    if (!roomInfo) {
        res.status(400).json({"error": "Failed Such Room"})
    }

    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(
      "-------------------------------Error occurred in room/delete.js-------------------------------- \n",
      err,
      "-------------------------------Error occurred in room/delete.js-------------------------------- \n"
    );
    res.status(500).send();
  }
};