(function () {
    angular
        .module('EmuStock')
        .controller('UserDetailController', UserDetailController);

    function UserDetailController($routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.other_uid = $routeParams.o_uid;

            vm.self = vm.user;
            vm.other = null;

            vm.follow = follow;
            vm.unfollow = unfollow;

            UserService.findUserById(vm.other_uid)
                .then(
                    function (res) {
                        vm.other = res.data;
                        console.log(vm.other.followers);
                        vm.other.followed = vm.other.followers.filter(x => x._id === vm.self._id).length >= 1;
                    }
                );
        }

        // functions
        function follow() {
            UserService.followUser(vm.self._id, vm.other_uid)
                .then(
                    function () {
                        console.log("follow success.");
                        vm.other.followed = true;
                    },
                    function () {
                        vm.other.followed = false;
                        console.warn("follow failed. try again later");
                    }
                );
        }

        function unfollow() {
            UserService.unfollowUser(vm.self._id, vm.other_uid)
                .then(
                    function () {
                        console.log("unfollow success.");
                        vm.other.followed = false;
                    }
                );
        }
    }
})();
