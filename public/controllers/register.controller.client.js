/**
 * Created by ChienliMa on 05/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, SharedService, UserService) {
        let vm = this;
        vm.shared = SharedService;

        vm.user = {};

        vm.register = function () {
            if(vm.myForm.$invalid == true){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
                vm.vpsdAlert = "Passwords don't match!";
            } else if(vm.user.password !== vm.user.verpass){
                vm.error = "Please check and resubmit!";
                vm.alert = "* Required Field";
                vm.vpsdAlert = "Passwords don't match!";
            }else{
            return UserService.register(vm.user)
                .then(
                    function () {
                        console.log("Register success");
                        $location.url(vm.shared.getRoute('profile'));
                    },
                    function (err) {
                        console.warn(err.data);
                    }
                );
        };
        }
    }
})();
