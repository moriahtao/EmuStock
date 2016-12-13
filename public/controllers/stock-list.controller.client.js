(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($location, SharedService, UserService, StockService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.stocks = [];
            vm.input = "";
            vm.search = search;

            quoteStocks();
        }


        function quoteStocks() {
            for (var symbol of vm.user.stocks) {
                StockService.quote(symbol).then(
                    res => vm.stocks.push(res.data)
                );
            }
        }

        function search() {
            $location.url(vm.shared.getRoute('stock_search') + `?input=${vm.input}`);
        }
    }
})();

