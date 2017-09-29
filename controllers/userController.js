var User = require("../models/User.js");
var bcrypt = require('bcrypt');

module.exports = {

    createUser: function(req, res) {

        User.findOne({ username: req.body.username }, function(error, user) {

            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Otherwise send the new User to the browser.
            else {

                if(user){
                    res.send("User already exists!");
                }
                else{


                    User.findOne({ email: req.body.email }, function(error, user) {

                        // Send any errors to the browser
                        if (error) {
                            res.send(error);
                        }
                        // Otherwise send the new User to the browser.
                        else {

                            if(user){
                                res.send("User already exists!")
                            }
                            else{

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

                            }

                        }

                    });

                }

            }

        });

    },

    validateLogin: function(req, res) {

        // Create query object
        var query = {};

        // Check for email or username and modify query
        if (req.body.login.indexOf('@') === -1) {
            query.username = req.body.login;
        } else {
            query.email = req.body.login;
        }

        // Find one User by their username/email
        User.findOne(query, function(error, user) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, compare the password to the stored hash.
            else {

                bcrypt.compare(req.body.password, user.password, function(err, response) {

                    // Return true/false if successful/unsuccessful
                    if (response) {
                        res.send(user);
                    } else {
                        res.send(false);
                    }

                })
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

        // Create query object
        var query = {};

        // Check for email or username and modify query
        if (req.query.username || req.query.email) {
            query = req.query;
        } else {
            query._id = req.params.id;
        }

        // Find one User by their id and populate friends, requested, pending, posts, and tags arrays.
        User.findOne(query, null, {sort: {date: 1}}).populate(["friends", "requested", "pending",
            {
                path: 'posts',
                model: 'Post',
                populate: [
                {
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'owner',
                        model: 'User'
                    }         
                },{
                    path: 'owner',
                    model: 'User'
                }]
            }, "tags"])
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

    oneUserId: function(req, res) {
        User.findById(req.params.id).exec(function(error, user) {
            if (error) {
                res.send(error);
            }
            else {
                res.send(user);
            }
        })
    },

    deleteUser: function(req, res) {

        // Find one User by their id and remove.
        User.findByIdAndRemove(req.params.id, function(error, user) {
            // Send any errors to the browser
            if (error) {
                res.send(error);
            }
            // Or, send deleted User to the browser.
            else {
                res.send(user);
            }
        });

    }

}