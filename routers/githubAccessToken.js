const router = require("express").Router();
const controller = require("../controllers").githubAccessToken;

router.get("/", controller.get);

module.exports = router;