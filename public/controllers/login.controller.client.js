(function () {
    angular
        .module('EmuStock')
        .controller('LoginController', LoginController);

    function LoginController($location, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        vm.user = {};

        // login with session enabled
        vm.login = function () {
            if (vm.myForm.$invalid == true) {
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
            } else {
                UserService.login(vm.user).then(
                    (res) => {
                        console.log("login succeeded");
                        var user = res.data;
                        $location.url(vm.shared.getRoute('timeline', {s_uid: user._id}));
                    },
                    () => console.warn("Invalid username password pair")
                );
            }
        }
    }
})();
