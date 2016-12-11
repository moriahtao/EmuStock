/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('UserSearchController', UserSearchController);

    function UserSearchController($routeParams, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;

        vm.uid = $routeParams.s_uid;

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
