/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('UserListController', UserListController);

    function UserListController($routeParams, UserService) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.users = [];
        vm.user = {};
        vm.term = ""; // used for user search
        vm.users = {};

        vm.search = function() {
            UserService.searchUserByUsername(vm.term)
                .then(
                    function(res) {
                        vm.users = res.data;
                    }
                )
        };
    }
})();
