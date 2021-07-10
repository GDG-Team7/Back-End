const { room, platform } = require("../../models");
module.exports = async (req, res) => {
  const authData = req.authData;
  const { id, title, member_limit, end_time, language, annual_min, annual_max, platform_type, platform_url } = req.body;

  if (
    !authData ||
    !id ||
    !(title || member_limit || end_time || language || annual_min || annual_max || platform_type || platform_url)
  ){
    return res.status(400).json({ message: "Insufficient info" });
  }

  try {
    const updateAt = Date.now();

    await room.update({
      title: title,
      member_limit: member_limit,
      end_time: end_time,
      language: language,
      annual_min: annual_min,
      annual_max: annual_max,
      updateAt: updateAt
    }, {
      where: { id: id }
    });
    await platform.update({
      type: platform_type,
      platform_url: platform_url
    }, {
        where: { user_id: id }
    });

    res.status(200).json({ message: "successfully edited" });
  } catch (err) {
    console.log(
        "-------------------------------Error occurred in room/edit.js-------------------------------- \n",
        err,
        "-------------------------------Error occurred in room/edit.js-------------------------------- \n"
      );
      return res.status(500).send();
  }
};