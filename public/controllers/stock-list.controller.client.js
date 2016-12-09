(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.term = "stock name";

        UserService.findUserById(vm.uid)
            .then(
                function(res) {
                    vm.stocks = res.data.stocks;
                }
            );
    }
})();

