// Stock controller is reused by multiple view. Therefore it has two mode.
// FOLLOW_MODE : which allow user to follow displayed stocks
// UNFOLLOW_MODE : which allow user to unfollow displayed stocks

var FOLLOW_MODE  = 1;
var UNFOLLOW_MODE = 2;
var DETAIL_MODE = 3;

(function () {
    angular
        .module('EmuStock')
        .controller('StockController', StockController);

    function StockController($http, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.stock = {};
        vm.term = "stock name";
        vm.mode = FOLLOW_MODE;

        // set contorller working mode


        // diferent initialization with different controller
        switch(vm.mode) {
            case FOLLOW_MODE:
                // initialize vm.stocks
                break;
            case UNFOLLOW_MODE:
                // initialize vm.stocks
                break;
            case DETAIL_MODE:
                // only initialize vm.stock
        }


        vm.follow = function() {
            UserService.followUser()
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
            UserService.unfollowUser()
                .then(
                    function() {
                        alert("unfollow success.");
                        // delete stock from stocks
                        if (vm.mode == FOLLOW_MODE) {
                            vm.stocks = vm.stocks.filter(function(x){return x.symbol != vm.stock.symbol;});
                        }
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
