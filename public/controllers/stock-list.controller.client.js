(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.s_uid;
        vm.stocks = [];

        UserService.findUserById(vm.uid)
            .then(
                function(res) {
                    vm.stocks = res.data.stocks;
                }
            );
    }
})();

