module.exports = function (models) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));

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
        followStock: followStock,
        unfollowStock: unfollowStock,
        followUser: followUser,
        unfollowUser: unfollowUser,
        authAdmin, authAdmin,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        searchUserByUsername: searchUserByUsername,
    };

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        models.user.findOne({_id: user._id}).then(
            user => {
                done(null, user);
            },
            err => {
                done(err, null);
            }
        );
    }

    function localStrategy(username, password, done) {
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
        models.user.findOne({_id: userId}).populate('followings').populate('followers').then(
            user => res.json(user)
        );
    }

    function updateUser(req, res) {
        var userId = req.body._id;
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

    function followStock(req, res) {
        var userId = req.params.userId;
        var symbol = req.params.symbol;
        models.user.update({_id: userId}, {$push: {stocks: symbol}}).then(
            () => res.sendStatus(200)
        );
    }

    function unfollowStock(req, res) {
        var userId = req.params.userId;
        var symbol = req.params.symbol;
        models.user.update({_id: userId}, {$pullAll: {stocks: symbol}}).then(
            () => res.sendStatus(200)
        );
    }

    function followUser(req, res) {
        var userId = req.params.userId;
        var f_uid = req.params.f_uid;
        models.user.update({_id: userId}, {$push: {followings: f_uid}}).then(
            () => models.user.update({_id: f_uid}, {$push: {followers: userId}}).then(
                () => res.sendStatus(200)
            )
        );
    }

    function unfollowUser(req, res) {
        var userId = req.params.userId;
        var f_uid = req.params.f_uid;
        models.user.update({_id: userId}, {$pullAll: {followings: f_uid}}).then(
            () => models.user.update({_id: f_uid}, {$pullAll: {followers: userId}}).then(
                () => res.sendStatus(200)
            )
        );
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

    function authAdmin(req, res, next) {
        if (req.user.isAdmin) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function findAllUsers(req, res) {
        models.user.find({isAdmin: false}).then(
            users => res.json(users)
        );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        models.user.remove({_id: userId}).then(
            () => res.sendStatus(200)
        );
    }

    function searchUserByUsername(req, res) {
        var username = req.query.username;
        models.user.find({username: new RegExp(username, 'i')}).then(
            users => res.json(users)
        );
    }
};
