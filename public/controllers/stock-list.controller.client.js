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
    }
})();

