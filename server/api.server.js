module.exports = function (app, services) {
    var passport = require('passport');

    // public APIs
    app.get('/api/user/loggedin', services.user.loggedin);
    app.post('/api/user/register', services.user.register);
    app.post('/api/user/login', passport.authenticate('local'), services.user.currentUser);

    // private APIs
    // TODO: uncomment this
    // app.all('/api/\*', services.user.auth);
    app.post('/api/user/logout', services.user.logout);
    app.get('/api/user/current', services.user.currentUser);
    app.get('/api/user/:userId', services.user.findUserById);
    app.put('/api/user/', services.user.updateUser);
    app.delete('/api/user/', services.user.deleteUser);
    app.get('/api/user/:userId/timeline', services.user.getTimelineByUserId);
    app.post('/api/user/:userId/stock/:symbol', services.user.followStock);
    app.delete('/api/user/:userId/stock/:symbol', services.user.unfollowStock);
    app.post('/api/user/:userId/follow/:f_uid', services.user.followUser);
    app.delete('/api/user/:userId/follow/:f_uid', services.user.unfollowUser);
    app.post('/api/comment', services.comment.createComment);
    app.get('/api/user/:userId/comments', services.comment.findCommentsByUser);
    app.get('/api/comment/stock/:symbol', services.comment.findCommentsBySymbol);
    app.delete('/api/comment/:commentId', services.comment.deleteCommentById);

    // admin only APIs
    app.all('/api/admin/\*', services.user.authAdmin);
    app.get('/api/admin/users', services.user.findAllUsers);
    app.delete('/api/admin/user/:userId', services.user.deleteUser);
};
