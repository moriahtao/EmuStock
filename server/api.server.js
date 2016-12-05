module.exports = function (app, services) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

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
                    if (err) {
                        return done(err);
                    }
                }
            );
        }
    ));

    app.post('/api/user/register', register);
    app.post('/api/user/login', passport.authenticate('local', {
        successRedirect: '/#profile',
        failureRedirect: '/#login',
    }));
    app.put('/api/user/update', auth, updateUser);
    app.delete('/api/user/delete', auth, deleteUser);
    app.get('/api/comments', auth, findCommentsBySymbol);


    function auth(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        services.user.createUser(user).then(
            user => {
                res.json(user);
            }
        );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        services.user.updateUser(userId, user).then(
            () => {
                res.sendStatus(200);
            }
        );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        services.user.deleteUser(userId).then(
            () => {
                res.sendStatus(200);
            }
        );
    }

    function findCommentsBySymbol(req, res) {
        var symbol = req.query.symbol;
        services.stock.findCommentsBySymbol(symbol).then(
            comments => {
                res.json(comments);
            }
        );
    }
};
