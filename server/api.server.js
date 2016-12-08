module.exports = function (app, services) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");


    // server api routes
    app.get('/api/user/loggedin', loggedin);
    app.post('/api/user/register', register);
    app.post('/api/user/login', passport.authenticate('local'), currentUser);
    app.get('/api/user/:uid', findUserById);
    app.get('/api/user/current', currentUser);
    app.put('/api/user/update', auth, updateUser);
    app.post('/api/user/logout', auth, logout);
    app.delete('/api/user/delete', auth, deleteUser);
    app.get('/api/user/:userId/comments', auth, findCommentsByUser);
    app.get('/api/stock/:symbol/comments', auth, findCommentsBySymbol);


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        services.user.findUserById(user._id).then(
            user => {
                done(null, user);
            },
            err => {
                done(err, null);
            }
        );
    }

    passport.use(new LocalStrategy(
        function (username, password, done) {
            services.user.findUserByUsername(username).then(
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

    function loggedin(req, res) {
        res.json(req.isAuthenticated() ? req.user : false);
    }

    function auth(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function register(req, res) {
        // TODO: prevent duplicate usernames
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        services.user.createUser(user).then(
            user => {
                req.login(user, err => res.json(user));
            }
        );
    }

    function findUserById(req, res) {
        var uid = req.params.uid;
        services.user.findUserById(uid).then(
            user => {
                res.json(user);
            }
        );
    }

    function currentUser(req, res) {
        res.json(req.user);
    }

    function updateUser(req, res) {
        var userId = req.user._id;
        var user = req.body;
        services.user.updateUser(userId, user).then(
            () => {
                res.sendStatus(200);
            }
        );
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        services.user.deleteUser(userId).then(
            () => res.sendStatus(200)
        );
    }

    function findCommentsByUser(req, res) {
        var userId = req.params.userId;
        services.user.findCommentsByUser(userId).then(
            comments => res.json(comments)
        );
    }

    function findCommentsBySymbol(req, res) {
        var symbol = req.query.symbol;
        services.stock.findCommentsBySymbol(symbol).then(
            comments => res.json(comments)
        );
    }
};
