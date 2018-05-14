const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./Task");
const Recipient = require("./Recipient");
//create tasks using mongodb

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: [true, "Task name is required"]
  },
  taskParticipant: {
    type: String,
    required: [true, "One Participant is required"]
  },
  dateCreated: {
    type: Date
  },
  dueDate: {
    type: Date,
    requied: [false]
  },
  tags: {
    type: String,
    required: [true, "tag is required"]
  },
  notes: {
    type: String,
    required: [false]
  },
  is_done: {
    type: Boolean,
    default: false
  },
  comments: [
    {
      comment: String
    }
  ]
});

const task = mongoose.model("task", taskSchema);
module.exports = task;
