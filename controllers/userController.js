var User = require("../models/User.js");

module.exports = {

    createUser: function(req, res) {

        // and update it's "note" property with the _id of the new note
        var newUser = new User(req.body);
        // Save the new note to mongoose
        newUser.save(function(error, doc) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise
            else {
                res.send(doc);
            }
        });
    },

    addFriend: function(req, res) {

        // Save the new note to mongoose
        User.findById(req.params.friendId, function(error, buddy) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise
            else {
                // Find our user and push the new note id into the User's notes array
                User.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { "friends": buddy } }, { new: true }, function(err, updatedUser) {
                    // Send any errors to the browser
                    if (err) {
                        res.send(err);
                    }
                    // Or send the updatedUser to the browser
                    else {
                        console.log(updatedUser)
                        User.findOneAndUpdate({ _id: buddy._id }, { $addToSet: { "pending": req.params.id } }, { new: true }, function(err, updatedFriend) {
                            // Send any errors to the browser
                            if (err) {
                                res.send(err);
                            }
                            // Or send the updatedUser to the browser
                            else {
                                console.log(updatedFriend)
                                res.send([updatedUser, updatedFriend]);
                            }
                        });
                    }
                });

            }
        });

    },

    allUsers: function(req, res) {

        User.find({}).populate("friends")
            // Now, execute that query
            .exec(function(error, all) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the books stored in the library
                else {
                    res.send(all);
                }
            });

    }

}