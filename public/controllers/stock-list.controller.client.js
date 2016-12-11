(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($location, $routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init(){
            vm.stocks = vm.user.stocks;
            vm.input = "";
            vm.search = search;
        }

        function search() {
            $location.url(vm.shared.getRoute('stock_search') + `?input=${vm.input}`);
        }
    }
})();

