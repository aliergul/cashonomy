const addTag = require("../controllers/tag/addTag").addTag;
const deleteTag = require("../controllers/tag/deleteTag").deleteTag;
const getTags = require("../controllers/tag/getTags").getTags;

module.exports = {
  addTag,
  deleteTag,
  getTags,
};
