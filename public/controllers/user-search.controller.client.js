/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('UserSearchController', UserSearchController);

    function UserSearchController(SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.term = ""; // used for user search
            vm.search = search;
        }

        function search() {
            UserService.searchUserByUsername(vm.term)
                .then(
                    function(res) {
                        vm.users = res.data;
                    }
                )
        };

    }
})();
