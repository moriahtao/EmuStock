// this controller can be reused in 4 situations:
// 1. self.following
// 2. self.followed
// 3. other.following
// 4. other.followed

// We do not allow follow and unfollow operation
// user can only follow/unfollow user in detail page

(function () {
    angular
        .module('EmuStock')
        .controller('UserListController', UserListController);

    function UserListController($location, $routeParams, SharedService, UserService) {
        var vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.uid;
        vm.users = [];

        var path = $location.path();
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
