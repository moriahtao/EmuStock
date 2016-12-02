// User controller is reused by multiple view. Therefore it has three modes.

// mode is either:
// SEARCH_MODE : where this controller is used in user searching
// SELF_DISPLAY_MODE : where this controller is used in display current user's following&follower
// OTHER_DISPLAY_MODE : where this controller is usd in display other users' following&follower

var SEARCH_MODE = 0;
var SELF_DISPLAY_MODE  = 1;
var OTHER_DISPLAY_MODE  = 2;

(function () {
    angular
        .module('EmuUser')
        .controller('UserController', UserController);

    function UserController($http, $routeParams) {
        var vm = this;

        vm.uid = $routeParams.uid;

        vm.users = [];
        vm.user = {};
        vm.term = ""; // used for user search

        // todo : judge mode by routeParams
        vm.mode = SELF_DISPLAY_MODE;

        switch(vm.mode) {
            case SELF_DISPLAY_MODE:

                break;
            case OTHER_DISPLAY_MODE:

                break;
        }


        vm.follow = function() {
            $http.post("/api/user/" + vm.uid + "/follow/" + vm.user._id)
                .then(
                    function() {
                        alert("follow success.");
                    },
                    function() {
                        alert("follow failed. try again later");
                    }
                );
        };

        vm.unfollow = function() {
            $http.delete("/api/user/" + vm.uid + "/follow/" + vm.user._id)
                .then(
                    function() {
                        alert("unfollow success.");
                        // delete User from Users
                        if (vm.mode == SELF_DISPLAY_MODE) {
                            vm.users = vm.users.filter(function(x){return x._id != vm.users._id;});
                        }
                    }
                );
        };

        vm.search = function() {
            $http.get("/api/user/?term=" + vm.term)
                .then(
                    function(res) { vm.users = res; }
                )
        };
    }
})();
