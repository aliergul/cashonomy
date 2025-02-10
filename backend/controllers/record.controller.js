const addRecord = require("../controllers/record/addRecord").addRecord;
const getRecords = require("../controllers/record/getRecords").getRecords;
const deleteRecord = require("../controllers/record/deleteRecord").deleteRecord;

module.exports = {
  addRecord,
  getRecords,
  deleteRecord,
};
