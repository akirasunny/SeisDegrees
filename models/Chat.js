// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ChatSchema = new Schema({
    // room is a required string
    room: {
        type: String,
        required: true
    },

    owners: [{
        type: String,
        required: true
    }],

    members: [{
        type: String
    }],

    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message"
    }]
});

// Create the Chat model with the ChatSchema
var Chat = mongoose.model("Chat", ChatSchema);

// Export the model
module.exports = Chat;