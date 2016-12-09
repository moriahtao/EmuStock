/**
 * Created by ChienliMa on 05/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

        vm.user = {};

        vm.register = function () {
            return UserService.register(vm.user)
                .then(
                    function () {
                        console.log("Register success");
                        $location.url(vm.shared.getRoute('profile'));
                    },
                    function (err) {
                        console.warn(err.data);
                    }
                );
        };
    }
})();
