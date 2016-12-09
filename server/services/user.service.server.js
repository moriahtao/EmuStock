module.exports = function (models) {

    const passport = require('passport');
    const LocalStrategy = require('passport-local').Strategy;
    const bcrypt = require("bcrypt-nodejs");

    passport.serializeUser = function (user, done) {
        done(null, user);
    };

    passport.deserializeUser = function (user, done) {
        models.user.findOne({_id: user._id}).then(
            user => {
                done(null, user);
            },
            err => {
                done(err, null);
            }
        );
    };

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
        const user = req.body;
        user.password = bcrypt.hashSync(user.password);
        models.user.create(user).then(
            user => req.login(user, err => res.json(user))
        );
    }

    function findUserById(req, res) {
        const userId = req.params.userId;
        models.user.findOne({_id: userId}).then(
            user => res.json(user)
        );
    }

    function updateUser(req, res) {
        const userId = req.user._id;
        const user = req.body;
        models.user.update({_id: userId}, user).then(
            () => res.sendStatus(200)
        );
    }

    function deleteUser(req, res) {
        const userId = req.params.userId;
        models.user.remove({_id: userId}).then(
            () => res.sendStatus(200)
        );
    }

    function getTimelineByUserId(req, res) {
        const userId = req.params.userId;
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
        const username = req.query.username;
        models.user.findOne({username: username}).then(
            user => res.json(user)
        );
    }

};
