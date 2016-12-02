/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuUser')
        .controller('UserListController', UserListController);

    function UserListController($routeParams, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.users = [];
        vm.user = {};
        vm.term = ""; // used for user search
        vm.users = {};

        vm.follow = function(f_uid) {
            UserService.followUser(vm.uid, f_uid)
                .then(
                    function() {
                        alert("follow success.");
                    },
                    function() {
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function(uf_uid) {
            UserService.unfollowUser(vm.uid, uf_uid)
                .then(
                    function() {
                        alert("unfollow success.");
                        // delete User from Users
                        if (vm.mode == SELF_DISPLAY_MODE) {
                            vm.users = vm.users.filter(function(x){return x._id != vm.users._id;});
                        }
                    }
                );
        };

        vm.search = function() {
            UserService.searchUserByUsername(vm.term)
                .then(
                    function(res) { vm.users = res; }
                )
        };
    }
})();
