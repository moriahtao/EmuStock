module.exports = function (db) {
    return db.model('CommentModel', db.Schema({
        html: String,
        replyTo: {type: db.Schema.ObjectId, ref: 'CommentModel'},
    }));
};
