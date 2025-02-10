const addRecord = require("../controllers/record/addRecord").addRecord;
const getRecords = require("../controllers/record/getRecords").getRecords;
const deleteRecord = require("../controllers/record/deleteRecord").deleteRecord;
const editRecord = require("../controllers/record/editRecord").editRecord;

module.exports = {
  addRecord,
  getRecords,
  deleteRecord,
  editRecord,
};
