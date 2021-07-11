const router = require("express").Router();
const controller = require("../controllers").rooms;

router.get("/", controller.get);

module.exports = router;