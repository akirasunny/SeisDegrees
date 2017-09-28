var Chat = require("../models/Chat.js");
var Message = require("../models/Message.js");

module.exports = {

    createChat: function(req, res) {

        // Create chatroom name and add to request body
        req.body.room = req.body.owners.sort().join().replace(/,/g, "&");

        // Find all Users
        Chat.findOne({ room: req.body.room }, function(error, chat) {
            // Send any errors to the browser
            console.log(chat)
            if (error) {
                res.send(error);
            }
            // Or, send our results to the browser
            else {
                if (chat) {
                    console.log("Chat already exists!");
                    res.send(chat);

                } else {
                    console.log("Creating new Chat!");
                    // Create new Chat w/ data from front-end
                    var newChat = new Chat(req.body);
                    // Save the new Chat to mongoose
                    newChat.save(function(error, chat) {
                        // Send any errors to the browser
                        if (error) {
                            res.send(error);
                        }
                        // Otherwise send the new Chat to the browser.
                        else {
                            res.send(chat);
                        }
                    });

                }
            }
        });

    },


    updateLog: function(req, res) {

        // Add userId to request body
        req.body.user = req.params.userId

        // Create new Message w/ data from front-end
        var newMessage = new Message(req.body);

        // Save new message to db
        newMessage.save(function(error, message) {

            // Send any errors to the browser
            if (error) {
                res.send(err);
            }
            // Or save the Message to Chat messages array
            else {
                console.log(message)

                // Find the Chat by id and update
                Chat.findOneAndUpdate({ _id: req.params.chatId }, { $push: { messages: message } }, { new: true }, function(err, updatedChat) {
                    // Send any errors to the browser
                    if (err) {
                        res.send(err);
                    }
                    // Or send the updatedChat to the browser
                    else {
                        console.log(updatedChat)
                        res.send(updatedChat);
                    }
                });
            }

        })

    },

    addMember: function(req, res) {

        // Find the Chat by id and add new userId
        Chat.findOneAndUpdate({ _id: req.params.chatId }, { $addToSet: { members: req.params.userId } }, { new: true }, function(err, updatedChat) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the updatedChat to the browser
            else {
                console.log(updatedChat)
                res.send(updatedChat);
            }
        });

    },

    removeMember: function(req, res) {

        // Find the Chat by id and remove userId
        Chat.findOneAndUpdate({ _id: req.params.chatId }, { $pull: { members: req.params.userId } }, { new: true }, function(err, updatedChat) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the updatedChat to the browser
            else {
                console.log(updatedChat)
                res.send(updatedChat);
            }
        });

    },

    allChats: function(req, res) {

        // Find all Users
        Chat.find({}, function(error, all) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, send our results to the browser
            else {
                res.send(all);
            }
        });

    },

    oneChat: function(req, res) {

        var users = [req.params.id1,req.params.id2];
        var query = {};
        
        // Create chatroom name and add to request body
        query.room = users.sort().join().replace(/,/g, "&");

        // Find one Chat by their id and populate messages, members, and owners arrays. (Note: need to specify path)
        Chat.find(query).populate(["messages", { path: "members", model: "User" }, { path: "owners", model: "User" }])
            // Now, execute that query
            .exec(function(error, chat) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the Messages/Users within each of the specified arrays.
                else {
                    res.send(chat);
                }
            });

    },

    deleteChat: function(req, res) {

        // Find one Chat by their id and remove.
        Chat.findByIdAndRemove(req.params.id, function(error, chat) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, send our deleted Chat to the browser.
            else {
                res.send(chat);
            }
        });

    }

}