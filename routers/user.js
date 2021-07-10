const router = require("express").Router();
const controller = require("../controllers").user;
const requiredTokenCheck = require("../middlewares/requiredTokenCheck");

router.get("/", requiredTokenCheck, controller.get);
router.put("/", requiredTokenCheck, controller.put);

module.exports = router;