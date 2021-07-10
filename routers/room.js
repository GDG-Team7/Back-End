const router = require("express").Router();
const controller = require("../controllers").room;

router.get("/:room_id", controller.get);
router.post("/", controller.post);
router.patch("/", controller.patch);
router.delete("/:room_id", controller.delete);

module.exports = router;