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

    function UserListController(SharedService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm);
        console.log(vm.followers, vm.followings);
    }
})();
