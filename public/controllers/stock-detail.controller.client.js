(function () {
    angular
        .module('EmuStock')
        .controller('StockDetailController', StockDetailController);

    function StockDetailController($routeParams, StockService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.stock = {symbol : $routeParams.symbol};
        vm.term = "stock name";

        StockService.quote(vm.stock.symbol)
            .then(
                function(res) {
                    vm.stock.quote = res;
                }
            );

        StockService.chart(vm.stock.symbol)
            .then(
                function(res) {
                    vm.stock.chart = res;
                }
            );

        vm.follow = function() {
            UserService.followStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        alert("follow success.");
                    },
                    function() {
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            UserService.unfollowStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        alert("unfollow success.");
                        if (vm.stocks) {
                            vm.stocks = vm.stocks.filter(function(x){return x.symbol != vm.stock.symbol;});
                        }
                    }
                );
        };
    }
})();

