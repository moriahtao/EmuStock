(function () {
    angular
        .module('EmuStock')
        .controller('ProfileController', ProfileController);

    function ProfileController($http, $location, $routeParams) {
        var vm = this;
        vm.uid = $routeparams.uid;

        $http.get("/api/user/" + vm.uid)
            .then(
                function(res) {

                },
                function(res) {

                }
            )

        vm.update = s
    }
})();
