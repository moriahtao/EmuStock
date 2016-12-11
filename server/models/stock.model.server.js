module.exports = function (db) {
    return db.model('StockModel', db.Schema(
        {
            symbol: String,
            name : String,
            comments: [{type: db.Schema.ObjectId, ref: 'CommentModel'}],
        },
        {
            timestamps: true
        }));
};
