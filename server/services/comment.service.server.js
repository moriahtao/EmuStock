module.exports = function (models) {
    return {
        createComment: createComment,
    };

    function createComment(comment) {
        return models.comment.create(comment);
    }
};
