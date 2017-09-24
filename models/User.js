// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
    // title is a required string
    username: {
        type: String,
        required: true
    },
    // link is a required string
    img: {
        type: String,
        required: true
    },
    // This only saves one note's ObjectId, ref refers to the Note model
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],

    pending: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    requested: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]

});

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;