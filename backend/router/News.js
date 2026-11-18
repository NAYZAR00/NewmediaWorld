const express = require("express");
const controller = require("../controllers/NewControllers");
const { body, validationResult } = require("express-validator");
const Handler = require("../handlerVaildion/Handler");
const uploadNewsImage = require("../middleware/NewsImageUpload");

const parseNewsType = (req, res, next) => {
  if (typeof req.body.type !== "string") {
    next();
    return;
  }

  try {
    req.body.type = JSON.parse(req.body.type);
    if (!Array.isArray(req.body.type)) {
      return res.status(400).json({ message: "Types must be an array." });
    }
    next();
  } catch {
    return res.status(400).json({ message: "Types must be valid JSON." });
  }
};

const router = express.Router();

router.get("",  controller.index);
router.get("/home", controller.index);
router.post("", uploadNewsImage, parseNewsType,
[
body("title").notEmpty(),
body("description").notEmpty(),
body("author").notEmpty(),
body("type").isArray().notEmpty()
], 
Handler, controller.store);
router.get("/:id",  controller.show);
router.patch("/:id", uploadNewsImage, parseNewsType, controller.patch);
router.delete("/:id",  controller.destroy);




module.exports = router;
