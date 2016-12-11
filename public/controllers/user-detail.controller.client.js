(function () {
    angular
        .module('EmuStock')
        .controller('UserDetailController', UserDetailController);

    function UserDetailController($routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.other_uid = $routeParams.other_uid;

            vm.self = vm.user;
            vm.other = null;

            vm.follow = follow;
            vm.unfollow = unfollow;

            UserService.findUserById(vm.other_uid)
                .then(
                    function (res) {
                        vm.other = res.data;
                        setFollowed(); // in the end of file
                    }
                );
        }

        // initialization helper function
        function setFollowed() {
            for (var i = 0; i < vm.self.followings; i++) {
                if (vm.other_uid == vm.self.followings[i]) {
                    vm.other.followed = true;
                    break
                }
            }
        }

        // functions
        function follow() {
            UserService.followUser(vm.self_uid, vm.other_uid)
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
            UserService.unfollowUser(vm.self_uid, vm.other_uid)
                .then(
                    function () {
                        console.log("unfollow success.");
                        vm.other.followed = false;
                    }
                );
        }
    }
})();
