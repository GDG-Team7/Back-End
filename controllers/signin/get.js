const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const id = req.params["github_id"];
  try {
    const userInfo = await user.findOne({
      where: {
        github_id: id
      }
    });

    if (userInfo) {
      const accessToken = jwt.sign(
        { github_id: id },
        process.env.ACCESS_SECRET,
        { expiresIn: "1H" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(200).json({"member": "false"})
    }
  } catch (err) {
    console.log(
      "-------------------------------Error occurred in signin/get.js-------------------------------- \n",
      err,
      "-------------------------------Error occurred in signin/get.js-------------------------------- \n"
    );
    res.status(500).send();
  }
};