module.exports = function (models) {

    return {
        createComment: createComment,
        findCommentsByUser: findCommentsByUser,
        findCommentsBySymbol: findCommentsBySymbol,
        deleteCommentById: deleteCommentById,
    };

    function createComment(req, res) {
        const comment = req.body;
        models.comment.create(comment).then(
            comment => res.json(comment)
        );
    }

    function findCommentsByUser(req, res) {
        const userId = req.params.userId;
        models.comment.find({user: userId}).then(
            comments => res.json(comments)
        );
    }

    function findCommentsBySymbol(req, res) {
        const symbol = req.query.symbol;
        models.comment.find({stock: symbol}).then(
            comments => res.json(comments)
        );
    }

    function deleteCommentById(req, res) {
        const commentId = req.params.commentId;
        models.comment.remove({_id: commentId}).then(
            () => res.sendStatus(200)
        );
    }
};
