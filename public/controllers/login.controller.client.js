(function () {
    angular
        .module('EmuStock')
        .controller('LoginController', LoginController);

    function LoginController() {
        var vm = this;
        vm.test = 'go for it';
    }
})();
