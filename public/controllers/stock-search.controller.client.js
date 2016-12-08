/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('StockSearchController', StockSearchController);

    function StockSearchController($routeParams, SharedService, StockService) {
        var vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.uid;
        vm.stocks = [];
        vm.stock = {};
        vm.term = "stock name";

        vm.search = function() {
            StockService.lookup(vm.term)
                .then(
                    function(res) {
                        vm.stocks = res.data;
                    }
                )
        };
    }
})();

