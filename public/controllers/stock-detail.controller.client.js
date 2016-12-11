(function () {
    angular
        .module('EmuStock')
        .controller('StockDetailController', StockDetailController);

    function StockDetailController($routeParams, SharedService, UserService, StockService, CommentService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.uid;
        vm.stock = {symbol : $routeParams.symbol, followed : false};
        vm.term = "stock name";
        vm.comment = "";
        vm.comments = null;

        // get all comments for stock
        CommentService.findCommentByStock(vm.stock.symbol)
            .then(
                function(res){
                    vm.comments = res.data;
                }
            );

        // get user profile to know whether this stock is followed
        UserService.findUserById(vm.uid)
            .then(
                function(res){
                    let user = res.data;
                    for(let i=0; i<user.stocks; i++){
                        if(vm.stock.symbol == user.stocks[i]) {
                            vm.stock.followed = true;
                            break
                        }
                    }
                }
            );

        // get stock details
        StockService.quote(vm.stock.symbol)
            .then(
                function(res) {
                    vm.stock.quote = res.data;
                    console.log(vm.stock.quote);
                }
            );

        StockService.chart(vm.stock.symbol)
            .then(
                function(res) {
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
                            text: 'AAPL Stock Price'
                        },

                        series: [
                            {
                                name: 'AAPL',
                                data: points,
                                tooltip: {
                                    valueDecimals: 2
                                },
                            },
                        ]
                    });
                }
            );

        vm.follow = function() {
            UserService.followStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        console.log("follow success.");
                    },
                    function() {
                        console.warn("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            UserService.unfollowStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        console.log("unfollow success.");
                        if (vm.stocks) {
                            vm.stocks = vm.stocks.filter(function(x){return x.symbol != vm.stock.symbol;});
                        }
                    }
                );
        };

        vm.createComment = function() {
            CommentService.createComment(vm.comment)
                .then(
                    function (res) {
                        // todo : add comment to current comemnt list
                        // or refresh page
                    }
                );
        }
    }
})();

