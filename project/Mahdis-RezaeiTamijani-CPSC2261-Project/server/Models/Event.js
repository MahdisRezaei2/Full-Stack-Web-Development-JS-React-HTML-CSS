const mongoose = require("mongoose");

//object (event)
const EventSchema = mongoose.Schema({
      start: Date,
      end:Date,
      title : String
})

const Event = mongoose.model("Event", EventSchema );

module.exports = Event;