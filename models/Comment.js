// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var CommentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true
  },
  // Just a string
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },

});

// Remember, Mongoose will automatically save the ObjectIds of the Comments
// These ids are referred to in the Article model

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
