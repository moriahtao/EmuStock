module.exports = function (models) {

    return {
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
    };

    function findUserById(userId) {
        return models.user.findOne({_id: userId});
    }

    function findUserByUsername(username) {
        return models.user.findOne({username: username});
    }

    function createUser(user) {
        return models.user.create(user);
    }

    function updateUser(userId, user) {
        return models.user.update({_id: userId}, user);
    }

    function deleteUser(userId) {
        return models.user.remove({_id: userId});
    }
};
