(function () {
    angular
        .module('EmuStock')
        .controller('UserDetailController', UserDetailController);

    function UserDetailController($routeParams, SharedService, UserService) {

        var vm = this;
        vm.shared = SharedService;

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
            UserService.followUser(vm.self_uid, vm.other_uid)
                .then(
                    function() {
                        console.log("follow success.");
                        vm.other.followed = true;
                    },
                    function() {
                        vm.other.followed = false;
                        console.warn("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            UserService.unfollowUser(vm.self_uid, vm.other_uid)
                .then(
                    function() {
                        console.log("unfollow success.");
                        vm.other.followed = false;
                    }
                );
        };

        // helper function
        function setFollowed(){
            for(var i=0; i<vm.self.followings; i++){
                if(vm.other_uid == vm.self.followings[i]) {
                    vm.other.followed = true;
                    break
                }
            }
        }
    }
})();
