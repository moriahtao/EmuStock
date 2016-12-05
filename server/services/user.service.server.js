module.exports = function (models) {

    return {
        createUser: createUser,
        updateUser: updateUser,
        deleteUser: deleteUser,
    };

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
