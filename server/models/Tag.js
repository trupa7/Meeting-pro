const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  tagTitle: {
    type: String,
    required: [true, "Tag name is required"]
  },
  tagType: {
    type: String,
    required: [true, "Tag type is required"]
  }
});
