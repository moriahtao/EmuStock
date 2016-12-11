module.exports = function (models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        models.user.findOne({_id: user._id}).then(
            user => {
                done(null, user);
            },
            err => {
                done(err, null);
            }
        );
    });

    passport.use(new LocalStrategy(
        function (username, password, done) {
            models.user.findOne({username: username}).then(
                user => {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                err => {
                    return done(err);
                }
            );
        }
    ));

    return {
        auth: auth,
        loggedin: loggedin,
        currentUser: currentUser,
        logout: logout,
        register: register,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        searchUsersByUsername: searchUsersByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        getTimelineByUserId: getTimelineByUserId,
    };


    function auth(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : false);
    }

    function currentUser(req, res) {
        res.json(req.user);
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function register(req, res) {
        // TODO: prevent duplicate usernames
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        models.user.create(user).then(
            user => req.login(user, err => res.json(user))
        );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        models.user.findOne({_id: userId}).then(
            user => res.json(user)
        );
    }

    function updateUser(req, res) {
        var userId = req.user._id;
        var user = req.body;
        models.user.update({_id: userId}, user).then(
            () => res.sendStatus(200)
        );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        models.user.remove({_id: userId}).then(
            () => res.sendStatus(200)
        );
    }

    function getTimelineByUserId(req, res) {
        var userId = req.params.userId;
        models.user.findOne({_id: userId}).then(getFollowings);

        function getFollowings(user) {
            models.comment
                .find({user: {$in: user.followings}})
                .sort({createdAt: -1})
                .then(getTimeline);
        }

        function getTimeline(comments) {
            res.json(comments);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        models.user.findOne({username: username}).then(
            user => res.json(user)
        );
    }

    function searchUsersByUsername(req, res) {
        var username = req.query.username;
        models.user.find({username: new RegExp(`.*${username}.*`, 'i')}).then(
            users => res.json(users)
        );
    }

};
