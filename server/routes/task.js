const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

//_______________________________________Task__________________________________

router.get("/tasks", function(req, res, next) {
  Task.find({}).then(function(err, task) {
    if (err) {
      res.send(err);
    }
    res.send(task);
  });
});

//get by id
router.get("/tasks/:id", function(req, res, next) {
  Task.findOne({ _id: req.params.id }, req.body).then(function(task) {
    res.send(task);
  });
});

router.post("/tasks", function(req, res, next) {
  Task.create(req.body)
    .then(function(task) {
      res.send(task);
    })
    .catch(next);
});

//update
router.put("/tasks/:id", function(req, res, next) {
  Task.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Task.findOne({ _id: req.params.id }, req.body).then(function(task) {
      res.send(task);
    });
  });
});

//delete
router.delete("/tasks/:id", function(req, res, next) {
  Task.findByIdAndRemove({ _id: req.params.id }).then(function(task) {
    res.send(task);
  });
});

//push new comments

router.post("/tasks/comments/:taskid", function(req, res, next) {
  Task.findByIdAndUpdate(
    { _id: req.params.taskid },
    { $push: { comments: req.body } },
    { safe: true, upsert: true }
  ).then(function() {
    Task.findOne({ _id: req.params.taskid }).then(function(task) {
      res.send(task);
    });
  });
});

//delete topics
router.delete("/tasks/comments/:taskid/:comid", function(req, res, next) {
  Task.findByIdAndUpdate(
    { _id: req.params.taskid },
    { $pull: { comments: { _id: req.params.comid } } }
  ).then(function() {
    Task.findOne({ _id: req.params.taskid }).then(function(task) {
      res.send(task);
    });
  });
});

module.exports = router;
