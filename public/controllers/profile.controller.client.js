(function () {
    angular
        .module('EmuStock')
        .controller('ProfileController', ProfileController);

    function ProfileController(SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.update = update;
        }

        function update() {
            UserService.updateUser(vm.user).then(
                () => console.log("update succeeded"),
                () => console.warn("update failed, please try again later")
            )
        }

    }
})();
