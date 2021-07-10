const router = require("express").Router();
const controller = require("../controllers").signin;

router.post("/", controller.get);

module.exports = router;