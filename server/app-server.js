module.exports = function (app, db) {

    var UserModel = require('./models/user.model.server.js')(db);
    var StockModel = require('./models/stock.model.server.js')(db);
    var CommentModel = require('./models/comment.model.server.js')(db);

    var models = {
        user: UserModel,
        stock: StockModel,
        comment: CommentModel,
    };

    var UserService = require("./services/user.service.server.js")(models);
    var StockService = require("./services/stock.service.server.js")(models);
    var CommentService = require("./services/comment.service.server.js")(models);

    var services = {
        user: UserService,
        stock: StockService,
        comment: CommentService,
    };

    require('./api.server.js')(app, services);
};
