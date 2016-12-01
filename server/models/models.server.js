module.exports = function () {
    var connectionString = 'mongodb://localhost/emustock';
    var mongoose = require("mongoose");
    var db = new mongoose.Mongoose();
    db.connect(connectionString);
    db.connection.once('open', () => console.log('mongodb connected: EmuStock'));

    var UserModel = require('user.model.server')(db);
    var StockModel = require('stock.model.server')(db);
    var CommentModel= require('comment.model.server')(db);

    return {
        user: UserModel,
        stock: StockModel,
        comment: CommentModel,
    };
}
