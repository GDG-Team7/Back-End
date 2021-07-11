const { user } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { github_id, email, age, annual } = req.body;

  if ( !github_id || !email ) {
    return res.status(400).json({ message: "Insufficient info"});
  }

  try {
    await user.create({
      github_id,
      email,
      age,
      annual,
    });
    const accessToken = jwt.sign(
      { github_id: github_id },
      process.env.ACCESS_SECRET,
      { expiresIn: "1H" }
    );
    res.status(200).json({ accessToken });
  } catch(err) {
    console.log(
      "-------------------------------Error occurred in signin/signin.js-------------------------------- \n",
      err,
      "-------------------------------Error occurred in signin/signin.js-------------------------------- \n"
    );
    res.status(500).send();
  }
}