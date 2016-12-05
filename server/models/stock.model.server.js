module.exports = function (db) {
    return db.model('StockModel', db.Schema({
        symbol: String,
        comments: [{type: db.Schema.ObjectId, ref: 'CommentModel'}],
    }));
};
