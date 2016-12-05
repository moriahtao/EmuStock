/**
 * Created by ChienliMa on 05/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('RegisterController', RegisterController);

    function RegisterController($http, $location) {
        var vm = this;

        vm.user = {};
        vm.username = "";
        vm.password = "";

        // register with session
        vm.register = function() {
            return $http.post("/api/register", vm.user)
                .then(
                    function(res) {
                        alert("Register success");
                        $location.path("/profile/" + res.data._id);
                    },
                    function(res) {
                        alert(res.data);
                    }
                );
        };
    }
})();
