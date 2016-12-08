(function () {
    angular
        .module('EmuStock')
        .controller('LoginController', LoginController);

    function LoginController($location, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;

        vm.user = {};

        // login with session enabled
        vm.login = function () {
            if (!vm.user.username || !vm.user.password) {
                return vm.error = "username and password are required";
            }
            UserService.login(vm.user).then(
                () => {
                    console.log("login succeeded");
                    $location.url(vm.shared.getRoute('profile'));
                },
                () => console.warn("Invalid username password pair")
            );
        };
    }
})();
