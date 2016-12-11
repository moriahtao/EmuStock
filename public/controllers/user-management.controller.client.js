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
        .controller('UserManagementController', UserManagementController);

    function UserManagementController(SharedService, UserService) {
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init(){
            vm.users = UserService.getAllUsers();
            vm.delete = deleteUser;
        }

        function deleteUser(){
            UserService.deleteUser(uid)
                .then(
                    () => vm.users = vm.users.filter((x) => x._id != uid),
                    (err) => {alert("operation failed:" + err);}
                );
        }
    }
})();
