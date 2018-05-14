const express = require("express");
const router = express.Router();
const Meeting = require("../models/meeting");
const Task = require("../models/Task");

//....................................meetings............................................................

//get
router.get("/meetings", function(req, res, next) {
  Meeting.find({}).then(function(meeting) {
    res.send(meeting);
  });
});

//get by id
router.get("/meetings/:id", function(req, res, next) {
  Meeting.findOne({ _id: req.params.id }, req.body).then(function(meeting) {
    res.send(meeting);
  });
});

//insert
router.post("/meetings", function(req, res, next) {
  Meeting.create(req.body)
    .then(function(meeting) {
      res.send(meeting);
    })
    .catch(next);
});

//update
router.put("/meetings/:id", function(req, res, next) {
  Meeting.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Meeting.findOne({ _id: req.params.id }, req.body).then(function(meeting) {
      res.send(meeting);
    });
  });
});

//delete
router.delete("/meetings/:id", function(req, res, next) {
  Meeting.findByIdAndRemove({ _id: req.params.id }).then(function(meeting) {
    Meeting.find({}).then(function(meeting) {
      res.send(meeting);
    });
  });
});

//.................................topics---------------------------------------------------
//push new topics

router.post("/meetings/topics/:meetingid", function(req, res, next) {
  Meeting.findByIdAndUpdate(
    { _id: req.params.meetingid },
    { $push: { topics: req.body } },
    { safe: true, upsert: true },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//delete topics
router.delete("/meetings/topics/:meetingid/:topicid", function(req, res, next) {
  Meeting.findByIdAndUpdate(
    { _id: req.params.meetingid },
    { $pull: { topics: { _id: req.params.topicid } } },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//update topics
router.put("/meetings/topics/:meetingid/:topicid", function(req, res, next) {
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $set: {
        "topics.$.t_name": req.body.t_name
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//_______________________________________notes__________________________________
//put notes
router.post("/meetings/notes/:meetingid/:topicid/", function(req, res, next) {
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $push: {
        "topics.$.notes": [req.body]
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//delete notes
router.delete("/meetings/notes/:meetingid/:topicid/:noteid", function(req,res,next) {
  console.log(req.params.noteid);
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $pull: {
        "topics.$.notes": { _id: req.params.noteid }
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//update notes
router.put("/meetings/notes/:meetingid/:topicid/:noteid", function(
  req,
  res,
  next
) {
  console.log(req.params.noteid);
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $set: {
        "topics.$.notes": req.body
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//_______________________________________decisons__________________________________
//put notes
router.post("/meetings/decisons/:meetingid/:topicid/", function(
  req,
  res,
  next
) {
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $push: {
        "topics.$.decisons": [req.body]
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//delete notes
router.delete("/meetings/decisons/:meetingid/:topicid/:decisonid", function(
  req,
  res,
  next
) {
  console.log(req.params.noteid);
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $pull: {
        "topics.$.decisons": { _id: req.params.decisonid }
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

//update notes
router.put("/meetings/decisons/:meetingid/:topicid/:decisonid", function(
  req,
  res,
  next
) {
  console.log(req.params.noteid);
  Meeting.update(
    { "topics._id": req.params.topicid },
    {
      $set: {
        "topics.$.decisons": req.body
      }
    },
    function(err, model) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      return res.json(model);
    }
  );
});

module.exports = router;
