(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($routeParams, UserService, StockService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.stock = {};
        vm.term = "stock name";

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
                        vm.stocks = vm.stocks.filter(function(x){return x.symbol != vm.stock.symbol;});
                    }
                );
        };

        vm.search = function() {
            StockService.lookup()
                .then(
                    function(res) {
                        vm.stocks = res.data;
                    }
                )
        };
    }
})();

