(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($location, $routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.s_uid;
        vm.stocks = [];
        vm.input = "";

        UserService.findUserById(vm.uid)
            .then(
                function(res) {
                    vm.stocks = res.data.stocks;
                }
            );

        vm.search = function() {
            $location.url(vm.shared.getRoute('stock_search') + `?input=${vm.input}`);
        };
    }
})();

