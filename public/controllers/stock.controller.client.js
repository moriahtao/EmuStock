// Stock controller is reused by multiple view. Therefore it has two mode.
// listmode where ??
// follow mode where???

var LIST_MODE  = 0;
var FOLLOW_MODE  = 1;

(function () {
    angular
        .module('EmuStock')
        .controller('StockController', StockController);

    function StockController($http, $routeParams) {
        var vm = this;

        // todo : judge mode by routeParams
        vm.mode = FOLLOW_MODE;
        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.stock = {};


        vm.follow = function() {
            $http.post("/user/" + vm.uid + "/follow/" + vm.stock.symbol)
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
            $http.delete("/user/" + vm.uid + "/follow/" + vm.stock.symbol)
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

        };
    }
})();
