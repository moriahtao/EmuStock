/**
 * Created by ChienliMa on 02/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('UserSearchController', UserSearchController);

    function UserSearchController($routeParams, $location, SharedService, UserService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.term = ""; // used for user search
            vm.search = search;

            initSearchInput();
        }

        function search() {
            if (vm.term) $location.url(vm.shared.getRoute('search_user') + `?username=${vm.term}`);
        }

        function initSearchInput() {
            if ($routeParams.username) {
                vm.term = $routeParams.username;
                UserService.searchUserByUsername(vm.term).then(
                    res => vm.users = res.data
                )
            }
        }

    }
})();
