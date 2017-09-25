// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String
    }
});

// Create the Message model with the messageSchema
var Message = mongoose.model("Message", messageSchema);

// Export the model
module.exports = Message;