const addTag = require("../controllers/tag/addTag").addTag;
const deleteTag = require("../controllers/tag/deleteTag").deleteTag;
const getTags = require("../controllers/tag/getTags").getTags;
const editTag = require("../controllers/tag/editTag").editTag;

module.exports = {
  addTag,
  deleteTag,
  getTags,
  editTag,
};
