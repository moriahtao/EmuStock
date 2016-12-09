module.exports = function (db) {
    return db.model('UserModel', db.Schema(
        {
            isAdmin: {type: Boolean, default: false},
            username: String,
            password: String,
            name: {
                first: String,
                last: String,
            },
            email: String,
            phone: String,
            followings: [{type: db.Schema.ObjectId, ref: 'UserModel'}],
            followers: [{type: db.Schema.ObjectId, ref: 'UserModel'}],
            facebook: {
                id: String,
                token: String
            }
        },
        {
            timestamps: true
        }));
};
