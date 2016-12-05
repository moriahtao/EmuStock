(function () {
    angular
        .module('EmuStock')
        .controller('LoginController', LoginController);

    function LoginController($http, $location, SharedService) {
        var vm = this;
        vm.shared = SharedService;

        vm.user = {};

        // login with session enabled
        vm.login = function() {
            $http.post("/api/login", vm.user)
                .then(
                    function(res) {
                        $location.path("/profile/" + res.data._id);
                    },
                    function(res) {
                        alert("Invalid username password pair");
                    }
                );
        };
    }
})();
