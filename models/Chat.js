// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ChatSchema = new Schema({
  room: {
    type: String,
    required: true
  },
  // title is a required string
  messages: {
    type: String,
    required: true
  }
});

// Create the Chat model with the ChatSchema
var Chat = mongoose.model("Chat", ChatSchema);

// Export the model
module.exports = Chat;
