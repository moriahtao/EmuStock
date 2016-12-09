module.exports = function (models) {

    return {
        createComment: createComment,
        findCommentsByUser: findCommentsByUser,
        findCommentsBySymbol: findCommentsBySymbol,
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
};
