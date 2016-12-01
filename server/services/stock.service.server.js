module.exports = function (app, models) {

    app.get('/api/stock/comments', findCommentsBySymbol);

    function findCommentsBySymbol(req, res) {

    }
};
