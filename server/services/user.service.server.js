module.exports = function (app, models) {

    app.get('/api/user', currentUser);
    app.post('/api/user/create', createUser);
    app.put('/api/user/update', updateUser);
    app.delete('/api/user/delete', deleteUser);

    function currentUser(req, res) {

    }

    function createUser(req, res) {

    }

    function updateUser(req, res) {

    }

    function deleteUser(req, res) {

    }
};
