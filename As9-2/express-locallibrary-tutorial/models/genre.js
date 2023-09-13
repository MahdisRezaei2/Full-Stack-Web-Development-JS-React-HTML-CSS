const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genre = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  name: {
    type: String,
    required: true,
    // enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    // default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
genre.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/genre/${this._id}`;
});

// Export model
module.exports = mongoose.model("genre", genre);
