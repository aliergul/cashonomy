const express = require("express");
const router = express.Router();
const recordController = require("../controllers/record.controller");
const validateRecord = require("../middlewares/validateRecord");

router.post("/add-record", validateRecord, recordController.addRecord);
router.get("/get-records", recordController.getRecords);

module.exports = router;
