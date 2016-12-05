module.exports = function (app, models) {

    app.get('/api/user/', currentUser);
    app.post('/api/user/', createUser);
    app.put('/api/user/', updateUser);
    app.delete('/api/user/', deleteUser);

    function currentUser(req, res) {

    }

    function createUser(req, res) {

    }

    function updateUser(req, res) {

    }

    function deleteUser(req, res) {

    }
};
