(function () {
    angular
        .module('EmuUser')
        .controller('UserDetailController', UserDetailController);

    function UserDetailController($routeParams, UserService) {
        var vm = this;

        vm.self_uid = $routeParams.self_uid;
        vm.other_uid = $routeParams.other_uid;

        vm.self = null;
        vm.other = null;

        // get user profile to know whether this stock is followed
        UserService.findUserById(vm.self_uid)
            .then(
                function(res){
                    vm.self = res.data;
                    if(vm.other) {
                        setFollowed(); // in the end of file
                    }
                }
            );

        UserService.findUserById(vm.other_uid)
            .then(
                function(res){
                    vm.other = res.data;
                    if(vm.self) {
                        setFollowed(); // in the end of file
                    }
                }
            );

        // functions
        vm.follow = function() {
            $http.post("/api/user/" + vm.self_uid + "/follow/" + vm.other_uid)
                .then(
                    function() {
                        alert("follow success.");
                        vm.other.followed = true;
                    },
                    function() {
                        vm.other.followed = false;
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            $http.delete("/api/user/" + vm.self_uid + "/follow/" + vm.other_uid)
                .then(
                    function() {
                        alert("unfollow success.");
                        vm.other.followed = false;
                    }
                );
        };

        // helper function
        function setFollowed(){
            for(var i=0; i<vm.self.following; i++){
                if(vm.other_uid == vm.self.following[i]) {
                    vm.other.followed = true;
                    break
                }
            }
        }
    }
})();
