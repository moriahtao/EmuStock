module.exports = function (app, db) {

    var UserModel = require('user.model.server')(db);
    var StockModel = require('stock.model.server')(db);
    var CommentModel = require('comment.model.server')(db);

    var models = {
        user: UserModel,
        stock: StockModel,
        comment: CommentModel,
    };

    require("services/user.service.server.js")(app, models);
    require("services/stock.service.server.js")(app, models);
    require("services/comment.service.server.js")(app, models);
};
