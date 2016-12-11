(function () {
    angular
        .module('EmuStock')
        .controller('StockDetailController', StockDetailController);

    function StockDetailController($routeParams, $route, SharedService, UserService, StockService, CommentService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.s_uid;
        vm.stock = {symbol: $routeParams.symbol, followed: false};
        vm.comment = {
            html: "",
            user: vm.uid,
            stock: vm.stock.symbol,
        };
        vm.comments = null;

        // get all comments for stock
        CommentService.findCommentByStock(vm.stock.symbol)
            .then(
                function (res) {
                    vm.comments = res.data;
                }
            );

        // get user profile to know whether this stock is followed
        UserService.findUserById(vm.uid)
            .then(
                function (res) {
                    let user = res.data;
                    vm.stock.followed = user.stocks.indexOf(vm.stock.symbol) !== -1;
                }
            );

        // get stock details
        StockService.quote(vm.stock.symbol)
            .then(
                function (res) {
                    vm.stock.quote = res.data;
                }
            );

        StockService.chart(vm.stock.symbol)
            .then(
                function (res) {
                    vm.stock.chart = res.data;
                    var points = [];
                    for (var i = 0; i < vm.stock.chart.Dates.length; i++) {
                        points.push([
                            Date.parse(vm.stock.chart.Dates[i]),
                            vm.stock.chart.Elements[0].DataSeries.close.values[i],
                        ]);
                    }
                    $('#stock-chart').highcharts('StockChart', {

                        rangeSelector: {
                            selected: 1
                        },

                        title: {
                            text: `${vm.stock.symbol} Stock Price`
                        },

                        series: [
                            {
                                name: vm.stock.symbol,
                                data: points,
                                tooltip: {
                                    valueDecimals: 2
                                },
                            },
                        ],
                    });
                }
            );

        vm.follow = function () {
            UserService.followStock(vm.uid, vm.stock.symbol)
                .then(
                    function () {
                        console.log("follow success.");
                        vm.stock.followed = true;
                    },
                    function () {
                        console.warn("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function () {
            UserService.unfollowStock(vm.uid, vm.stock.symbol)
                .then(
                    function () {
                        console.log("unfollow success.");
                        vm.stock.followed = false;
                    }
                );
        };

        vm.createComment = function () {
            CommentService.createComment(vm.comment)
                .then(
                    function (res) {
                        // todo : add comment to current comment list or refresh page
                        $route.reload();
                    }
                );
        }
    }
})();

