(function () {
    angular
        .module('EmuStock')
        .controller('ProfileController', ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.user = {};
        vm.uid = $routeParams.uid;

        UserService.findUserById(vm.uid)
            .then(
                function(res) {
                    vm.user = res.data;
                },
                function(res) {
                    alert("error fetch user profile: " + res);
                }
            );

        vm.update = function() {
            UserService.updateUser(vm.uid, vm.user)
                .then(
                    function() { alert("update successed"); },
                    function() { alert("update failed, please try again later."); }
                )
        }
    }
})();
