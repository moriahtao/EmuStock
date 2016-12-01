(function () {
    angular
        .module('EmuStock')
        .controller('ProfileController', ProfileController);

    function ProfileController($http, $routeParams) {
        var vm = this;
        vm.user = {};

        $http.get("/api/user/" + $routeParams.uid)
            .then(
                function(res) {
                    vm.user = res.data;
                },
                function(res) {
                    alert("error fetch user profile");
                }
            );

        vm.update = function() {
            $http.put("/api/user/" + $routeParams.uid, vm.user)
                .then(
                    function(res) { alert("update successed"); },
                    function(res) { alert("update failed, please try again later."); }
                )
        }
    }
})();
