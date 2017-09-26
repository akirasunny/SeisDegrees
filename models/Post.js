// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// Create the Note schema
var PostSchema = new Schema({
  // Just a string
  title: {
    type: String,
    required: true
  },
  // Just a string
  body: {
    type: String,
    required: true
  },
  img: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  tagged: [{
  	type: Schema.Types.ObjectId,
    ref: "User"
  }]

});

// Remember, Mongoose will automatically save the ObjectIds of the Posts
// These ids are referred to in the Article model

// Create the Post model with the PostSchema
var Post = mongoose.model("Post", PostSchema);

// Export the Post model
module.exports = Post;
