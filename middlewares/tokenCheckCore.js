const jwt = require('jsonwebtoken');
const { user } = require('../models');

module.exports = async (req, res, next, authorization) => {
    const bearer = authorization.split(" ");

    if (bearer[0] === "Bearer") {
        try {
            const authData = jwt.verify(bearer[1], process.env.ACCESS_SECRET);
            const gid = authData.github_id;

            if (authData.github_id === undefined) {
                return res.status(401).send();
            }
            const userInfo = await user.findOne({
                where: {
                    "github_id": gid,
                },
            });

            if (userInfo) {
                req.authData = userInfo;
                next();
            } else if (!userInfo) {
                return res.status(401).json({ message: "Wrong Access" });
            }
        } catch(err) {
            switch (err.message) {
                case "jwt must be provided":
                  res.status(400).json({ message: "Insufficient info" });
                  break;
                case "jwt malformed":
                  res.status(400).json({ message: "Insufficient info" });
                  break;
                case "jwt expired":
                  res.status(401).json({ message: "Expired token" });
                  break;
                case "invalid token":
                  res.status(401).json({ message: "Invalid token" });
                  break;
                default:
                  console.log(
                    "---------------------------------Error occurred in tokenCheck.js---------------------------------",
                    err,
                    "---------------------------------Error occurred in tokenCheck.js---------------------------------"
                  );
                  res.status(500).json({ message: "Something wrong in server" });
                  break;
            }
            return;
        }
    } else {
        return res.status(400).json({ message: "Insufficient Info" })
    }
}