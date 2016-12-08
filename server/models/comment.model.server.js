module.exports = function (db) {
    return db.model('CommentModel', db.Schema({
        user: {type: db.Schema.ObjectId, ref: 'UserModel'},
        stock: {type: db.Schema.ObjectId, ref: 'StockModel'},
        replyTo: {type: db.Schema.ObjectId, ref: 'CommentModel'},
        html: String,
    }));
};
