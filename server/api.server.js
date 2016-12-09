module.exports = function (app, services) {
    const passport = require('passport');

    // public APIs
    app.get('/api/user/loggedin', services.user.loggedin);
    app.post('/api/user/register', services.user.register);
    app.post('/api/user/login', passport.authenticate('local'), services.user.currentUser);

    // private APIs
    // app.all('/api/\*', services.user.auth);
    app.get('/api/user/:userId', services.user.findUserById);
    app.get('/api/user/current', services.user.currentUser);
    app.put('/api/user/update', services.user.updateUser);
    app.post('/api/user/logout', services.user.logout);
    app.delete('/api/user/delete', services.user.deleteUser);
    app.get('/api/user/:userId/comments', services.comment.findCommentsByUser);
    app.get('/api/stock/:symbol/comments', services.comment.findCommentsBySymbol);
    app.post('/api/comment', services.comment.createComment);
    app.get('/api/user/:userId/timeline', services.user.getTimelineByUserId);

};
