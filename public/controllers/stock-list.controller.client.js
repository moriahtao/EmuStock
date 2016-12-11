(function () {
    angular
        .module('EmuStock')
        .controller('StockListController', StockListController);

    function StockListController($location, SharedService, UserService, StockService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init(){
            vm.stocks = vm.user.stocks;
            vm.input = "";
            vm.search = search;

            quoteStocks();
        }


        function quoteStocks() {
            for(var i=0; i<vm.stocks.length; i++){
                StockService.quote(vm.stocks[i])
                    .then(
                        function(res){
                            var symbol = vm.stocks[i];
                            vm.stocks[i] = {symbol : symbol, quote : res.data};
                            console.log(res.data);
                        }
                    )
            }
        }
        function search() {
            $location.url(vm.shared.getRoute('stock_search') + `?input=${vm.input}`);
        }
    }
})();

