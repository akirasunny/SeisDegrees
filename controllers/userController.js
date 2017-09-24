var User = require("../models/User.js");

module.exports = {

    createUser: function(req, res) {

        // Create new User w/ data from front-end
        var newUser = new User(req.body);
        // Save the new User to mongoose
        newUser.save(function(error, user) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise send the new User to the browser.
            else {
                res.send(user);
            }
        });
    },

    updateUser: function(req, res) {

        // Find the User by id and update
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function(err, updatedUser) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or send the updatedUser to the browser
            else {
                console.log(updatedUser)
                res.send(updatedUser);
            }
        });

    },

    addFriend: function(req, res) {

        // Find the User and push the new Friend into the User's requested array
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { "requested": req.params.friendId } }, { new: true }, function(err, updatedUser) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or add User's id to Friend's pending array
            else {
                console.log(updatedUser)
                User.findOneAndUpdate({ _id: req.params.friendId }, { $addToSet: { "pending": req.params.userId } }, { new: true }, function(err, updatedFriend) {
                    // Send any errors to the browser
                    if (err) {
                        res.send(err);
                    }
                    // Or send the updatedUser and updatedFriend to the browser
                    else {
                        console.log(updatedFriend)
                        res.send([updatedUser, updatedFriend]);
                    }
                });
            }
        });

    },

    removeFriend: function(req, res) {

        // Find the User and pull the old Friend from the User's friends array
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "friends": req.params.friendId } }, { new: true }, function(err, updatedUser) {
            // Send any errors to the browser
            if (err) {
                res.send(err);
            }
            // Or remove User's id from Stranger's pending array
            else {
                console.log(updatedUser)
                User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { "friends": req.params.userId } }, { new: true }, function(err, updatedStranger) {
                    // Send any errors to the browser
                    if (err) {
                        res.send(err);
                    }
                    // Or send the updatedUser and updatedStranger to the browser
                    else {
                        console.log(updatedStranger)
                        res.send([updatedUser, updatedStranger]);
                    }
                });
            }
        });

    },

    acceptFriend: function(req, res) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "pending": req.params.friendId }, $addToSet: { "friends": req.params.friendId } }, { new: true },
            function(err, updatedUser) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the updatedUser to the browser
                else {
                    console.log(updatedUser)
                    User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { "requested": req.params.userId }, $addToSet: { "friends": req.params.userId } }, { new: true },
                        function(err, updatedFriend) {
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
    },

    rejectFriend: function(req, res) {

        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { "pending": req.params.friendId } }, { new: true },
            function(err, updatedUser) {
                // Send any errors to the browser
                if (err) {
                    res.send(err);
                }
                // Or send the updatedUser to the browser
                else {
                    console.log(updatedUser)
                    User.findOneAndUpdate({ _id: req.params.friendId }, { $pull: { "requested": req.params.userId } }, { new: true },
                        function(err, updatedFriend) {
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
    },

    allUsers: function(req, res) {

        // Find all Users
        User.find({},
            function(error, all) {
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

    oneUser: function(req, res) {

        // Find one User by their id and populate friends, requested, pending, posts, and tags arrays.
        User.findById(req.params.id).populate(["friends", "requested", "pending", "posts", "tags"])
            // Now, execute that query
            .exec(function(error, user) {
                // Send any errors to the browser
                if (error) {
                    res.send(error);
                }
                // Or, send our results to the browser, which will now include the Users/Posts within each of the specified arrays.
                else {
                    res.send(user);
                }
            });

    },

    deleteUser: function(req, res) {

        // Find one User by their id and populate friends, requested, pending, posts, and tags arrays.
        User.findByIdAndRemove(req.params.id, function(error, user) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, send our results to the browser, which will now include the Users/Posts within each of the specified arrays.
            else {
                res.send(user);
            }
        });

    }

}