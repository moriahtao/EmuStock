(function () {
    angular
        .module('EmuStock')
        .controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;
        vm.test = 'go for it';
    }
})();
