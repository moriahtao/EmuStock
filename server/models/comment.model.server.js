module.exports = function (db) {
    return db.model('CommentModel', db.Schema({
        text: String,
        replyTo: {type: db.Schema.ObjectId, ref: 'CommentModel'},
    }));
};
