const router = require("express").Router();
const controller = require("../controllers").signin;

router.get("/:github_id", controller.get);
router.post("/", controller.post);

module.exports = router;