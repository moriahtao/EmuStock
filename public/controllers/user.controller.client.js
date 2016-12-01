// User controller is reused by multiple view. Therefore it has three modes.

// mode is either:
// SEARCH_MODE : where this controller is used in user searching
// SELF_DISPLAY_MODE : where this controller is used in display current user's following&follower
// OTHER_DISPLAY_MODE : where this controller is usd in display other users' following&follower

var SEARCH_MODE = 0;
var LIST_MODE  = 1;
var FOLLOW_MODE  = 2;

(function () {
    angular
        .module('EmuUser')
        .controller('UserController', UserController);

    function UserController($http, $routeParams) {
        var vm = this;

        vm.term = ""; // used for user search
        vm.users = [];
        vm.user = {};

        // todo : judge mode by routeParams
        vm.mode = FOLLOW_MODE;

        switch(vm.mode) {
            case SEARCH_MODE:

                break;
            case SELF_DISPLAY_MODE:

                break;
            case OTHER_DISPLAY_MODE:

                break;
        }


        vm.follow = function() {
            $http.post("/user/" + vm.uid + "/follow/" + vm.user._id)
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
            $http.delete("/user/" + vm.uid + "/follow/" + vm.user._id)
                .then(
                    function() {
                        alert("unfollow success.");
                        // delete User from Users
                        if (vm.mode == FOLLOW_MODE) {
                            vm.users = vm.users.filter(function(x){return x._id != vm.users._id;});
                        }
                    }
                );
        };

        vm.search = function() {
            $http.get("api/user/?term=" + vm.term)
                .then(
                    function(res) { vm.users = res; }
                )
        };
    }
})();
