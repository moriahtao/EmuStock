/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('StockSearchController', StockSearchController);

    function StockSearchController($routeParams, SharedService, StockService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.uid = $routeParams.uid;
            vm.input = $routeParams.input;
            vm.results = [];
            vm.stock = {};

            StockService.lookup(vm.input).then(
                res => vm.results = res.data
            );
        }
    }
})();

