const router = require("express").Router();
const controller = require("../controllers").imageUpload;
const upload = require("../middlewares/multer");
const requiredTokenCheck = require("../middlewares/requiredTokenCheck");

router.post("/", requiredTokenCheck, upload.single("image") ,controller.get);

module.exports = router;