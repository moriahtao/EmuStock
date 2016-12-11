(function () {
    angular
        .module('EmuStock')
        .controller('LoginController', LoginController);

    function LoginController($location, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

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
                        if (!user.isAdmin){
                            $location.url(vm.shared.getRoute('timeline', {s_uid: user._id}));
                        } else {
                            $location.url(vm.shared.getRoute('user_management', {adminid: user._id}));
                        }

                    },
                    () => console.warn("Invalid username password pair")
                );
            }
        }
    }
})();
