// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var PostSchema = new Schema({
  // Just a string
  title: {
    type: String
  },
  // Just a string
  body: {
    type: String
  },

  users: {
  	type: Schema.Types.ObjectId,
    ref: "User"
  }
});

// Remember, Mongoose will automatically save the ObjectIds of the Posts
// These ids are referred to in the Article model

// Create the Post model with the PostSchema
var Post = mongoose.model("Post", PostSchema);

// Export the Post model
module.exports = Post;
