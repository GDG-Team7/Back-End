const router = require("express").Router();
const controller = require("../controllers").imageUpload;
const upload = require("../middlewares/multer");

router.post("/", upload.single("image"), controller.get);

module.exports = router;