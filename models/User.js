// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var UserSchema = new Schema({
    // title is a required string
    username: {
        type: String,
        trim: true,
        required: true,
        text: true
    },
    // Email is required and needs to be validated
    email: {
        type: String,
        trim: true,
        required: true/*,
        validate: {
            validator: function(email) {
                var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return re.test(email)
            }
        }*/
    },
    // Password is required
    password: {
        type: String,
        trim: true,
        required: true,
        bcrypt: true
    },
    // Profile img
    img: {
        type: String,
        default: "/public/assets/ProfileImages/unavailable.jpg"
    },
    bio: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: "Secret"
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

// Attach to predefined password and secret field 
UserSchema.plugin(require('mongoose-bcrypt'));

// Create the User model with the UserSchema
var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;