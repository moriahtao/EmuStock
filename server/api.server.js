module.exports = function (app, services) {

    app.post('/api/user/create', createUser);
    app.put('/api/user/update', updateUser);
    app.delete('/api/user/delete', deleteUser);
    app.get('/api/stock/comments', findCommentsBySymbol);

    function createUser(req, res) {
        var user = req.body;
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
};
