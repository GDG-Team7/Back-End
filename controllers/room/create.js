const { room, platform } = require("../../models");
module.exports = async (req, res) => {
  const authData = req.authData;
  const { title, member_limit, end_time, language, annual_min, annual_max, platform_type, platform_url } = req.body;
  const image_url = req.file.path;
  const user_id = authData.id;
  
  if (
    !authData ||
    !title ||
    !member_limit ||
    !language ||
    !annual_min ||
    !annual_max
  ) {
    return res.status(400).json({ message: "Insufficient info" });
  }

  try {
    const createdAt = Date.now();
    const start_time = Date.now();
    if(!end_time) end_time = Date.now();

    //Room 생성하기
    const roomResult = await room.create({
      title,
      user_id,
      member_limit,
      start_time,
      end_time,
      language,
      annual_min,
      annual_max,
      image_url,
      createdAt
    });

    const room_id = roomResult.id
    const platformResult = await platform.create({
      room_id,
      type: platform_type,
      platform_url
    })

    res.status(200).json({ message: "successfully added", room_id: room_id});
  } catch (err) {
    console.log(
    "-------------------------------Error occurred in room/create.js-------------------------------- \n",
    err,
    "-------------------------------Error occurred in room/create.js-------------------------------- \n"
    );
    return res.status(500).send();
  }
};