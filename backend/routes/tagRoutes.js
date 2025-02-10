const express = require("express");
const router = express.Router();
const tagController = require("../controllers/tag.controller");
const validateTag = require("../middlewares/validateTag");

router.post("/add-tag", validateTag, tagController.addTag);
//router.get("/get-records", recordController.getRecords);
router.delete("/delete-tag/:tagId", tagController.deleteTag);
//router.put(
//  "/edit-record/:recordId",
//  validateRecord,
//  recordController.editRecord
//);

module.exports = router;
