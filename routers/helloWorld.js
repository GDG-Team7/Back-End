const router = require("express").Router();
const controller = require("../controllers").helloWorld;

router.get("/", controller.get);

module.exports = router;