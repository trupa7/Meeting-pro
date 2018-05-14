const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create employye schema @model

const MeetingSchema = new Schema({
  m_name: {
    type: String,
    required: [true, "Meeting Name is required"]
  },
  m_tags: {
    type: String,
    required: [true, "tag is required"]
  },
  m_participant: {
    type: String,
    required: [true, "Participant is required"]
  },
  from_date: {
    type: Date,
    required: [true, "From Date is required"]
  },
  to_date: {
    type: Date,
    required: [true, "To Date is required"]
  },
  location: {
    type: String,
    required: [true, "Locattion is required"]
  },
  created_by: {
    type: String,
    required: [true, "ownername is required"]
  },
  topics: [
    {
      t_name: {
        type: String,
        required: [false]
      },
      notes: [
        {
          n_name: {
            type: String,
            required: [false]
          }
        }
      ],
      decisons: [
        {
          d_name: {
            type: String,
            required: [false]
          }
        }
      ]
    }
  ]
});

const Meeting = mongoose.model("meeting", MeetingSchema);
module.exports = Meeting;
