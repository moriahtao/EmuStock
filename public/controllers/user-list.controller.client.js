// this controller can be reused in 4 situations:
// 1. self.following
// 2. self.followed
// 3. other.following
// 4. other.followed

// We do not allow follow and unfollow operation
// user can only follow/unfollow user in detail page

(function () {
    angular
        .module('EmuUser')
        .controller('UserListController', UserListController);

    function UserListController($location, $routeParams, UserService) {
        var vm = this;
        var path = $location.path();
        vm.uid = $routeParams.uid;
        vm.users = [];

        // initialization : get user profile to know whether this stock is followed
        UserService.findUserById(vm.uid)
            .then(
                function(res){
                    if (path.include("followings")) {
                        vm.users = res.data.followings;
                    }
                    if (path.include("followers")) {
                        vm.users = res.data.followers;
                    }
                }
            );
    }
})();
