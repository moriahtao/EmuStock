(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($routeParams, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.term = "stock name";

        UserService.findUserById(vm.uid)
            .then(
                function(res) {
                    vm.stocks = res.data.stocks;
                    for(var i=0; i<vm.stocks.length; i++){
                        vm.stocks.followed = true;
                    }
                }
            );

        vm.follow = function(symbol) {
            UserService.followStock(vm.uid, symbol)
                .then(
                    function() {
                        for(var i=0; i<vm.stocks.length; i++){
                            if (vm.stocks[i].symbol == symbol){
                                vm.stocks.followed = true;
                                break;
                            }
                        }
                        alert("follow success.");
                    },
                    function() {
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function(symbol) {
            UserService.unfollowStock(vm.uid, symbol)
                .then(
                    function() {
                        for(var i=0; i<vm.stocks.length; i++){
                            if (vm.stocks[i].symbol == symbol){
                                vm.stocks.followed = false;
                                break;
                            }
                        }
                        alert("unfollow success.");
                    }
                );
        };
    }
})();

