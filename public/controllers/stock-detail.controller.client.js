(function () {
    angular
        .module('EmuStock')
        .controller('StockDetailController', StockDetailController);

    function StockDetailController($routeParams, $route, SharedService, UserService, StockService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.stock = {
                symbol: $routeParams.symbol,
                followed: vm.user.stocks.indexOf($routeParams.symbol) !== -1,
            };

            vm.comment = {
                html: "",
                user: vm.user._id,
                stock: vm.stock.symbol,
            };
            vm.comments = [];

            vm.follow = follow;
            vm.unfollow = unfollow;
            vm.createComment = createComment;

            getStockDetails();
            getComments();
            plotChart();
        }


        // get all comments for stock
        function getComments() {
            CommentService.findCommentByStock(vm.stock.symbol).then(
                res => vm.comments = res.data
            );
        }

        // get stock details
        function getStockDetails() {
            StockService.quote(vm.stock.symbol).then(
                res => vm.stock.quote = res.data
            );
        }

        // plot chart of stock price
        function plotChart() {
            StockService.chart(vm.stock.symbol).then(
                function (res) {
                    $('#stock-chart').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: `${vm.stock.symbol} Stock Price`
                        },
                        series: [{
                            type: 'candlestick',
                            name: `${vm.stock.symbol} Stock Price`,
                            data: generateData(res.data),
                            dataGrouping: {
                                units: [
                                    [
                                        'week', // unit name
                                        [1] // allowed multiples
                                    ], [
                                        'month',
                                        [1, 2, 3, 4, 6]
                                    ]
                                ],
                            }
                        }],
                    });
                }
            );
        }

        // reformat raw data for chart plotting
        function generateData(rawData) {
            console.warn(rawData);
            return [];
        }

        function follow() {

            UserService.followStock(vm.user._id, vm.stock.symbol)
                .then(
                    function () {
                        console.log("follow success.");
                        vm.stock.followed = true;
                    },
                    function () {
                        console.warn("follow failed. try again later");
                    }
                );
        }

        function unfollow() {
            UserService.unfollowStock(vm.user._id, vm.stock.symbol)
                .then(
                    function () {
                        console.log("unfollow success.");
                        vm.stock.followed = false;
                    }
                );
        }

        function createComment() {
            CommentService.createComment(vm.comment).then(
                res => $route.reload()
            );
        }
    }
})();

