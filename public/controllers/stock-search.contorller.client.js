/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('StockSearchController', StockSearchController);

    function StockSearchController($routeParams, UserService, StockService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.stock = {};
        vm.term = "stock name";

        // no initialization

        vm.follow = function() {
            UserService.followStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        vm.stock.followed = false;
                        alert("follow success.");
                    },
                    function() {
                        vm.stock.followed = true;
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            UserService.unfollowStock(vm.uid, vm.stock.symbol)
                .then(
                    function() {
                        alert("unfollow success.");
                        vm.stock.followed = false;
                    },
                    function() {
                        alert("unfollow failed.");
                        vm.stock.followed = true;
                    }
                );
        };

        vm.search = function() {
            StockService.lookup(vm.term)
                .then(
                    function(res) {
                        vm.stocks = res.data;
                    }
                )
        };
    }
})();

