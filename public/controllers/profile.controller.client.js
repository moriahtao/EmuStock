(function () {
    angular
        .module('EmuStock')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;

        vm.user = {};

        UserService.findUserById($routeParams.s_uid).then(
            function (res) {
                vm.user = res.data;
            },
            function (err) {
                console.warn("error fetch user profile: " + err);
            }
        );

        vm.update = function () {
            UserService.updateUser(vm.user).then(
                () => console.log("update succeeded"),
                () => console.warn("update failed, please try again later")
            )
        };

        vm.logout = function () {
            UserService.logout().then(
                () => {
                    console.log('logout succeeded');
                    $location.url(vm.shared.getRoute('login'));
                },
                () => console.warn('logout failed, please try again later')
            );
        }
    }
})();
