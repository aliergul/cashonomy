const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const validateTag = require("../middlewares/validateTag");

router.post("/add-tag", validateTag, tagController.addTag);
router.get("/get-tags", tagController.getTags);
router.delete("/delete-tag/:tagId", tagController.deleteTag);
router.put("/edit-tag/:tagId", validateTag, tagController.editTag);

module.exports = router;
