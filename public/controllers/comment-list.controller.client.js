// this controller can be reused in 4 situations:
// 1. self.following
// 2. self.followed
// 3. other.following
// 4. other.followed

// We do not allow follow and unfollow operation
// user can only follow/unfollow user in detail page

(function () {
    angular
        .module('EmuStock')
        .controller('CommentListController', CommentListController);

    function CommentListController($routeParams, $location, SharedService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            if ($location.path().includes("timeline")) {
                CommentService.getTimelineByUserId($routeParams.s_uid)
                    .then(
                        function (res) {
                            vm.comments = res.data;
                        }
                    );
            } else if ($routeParams.symbol !== undefined) {
                let symbol = $routeParams.symbol;
                CommentService.findCommentByStock(symbol).then(
                    function (res) {
                        vm.comments = res.data;
                    }
                );
            } else {
                let uid;
                if ($routeParams.o_uid !== undefined) {
                    uid = $routeParams.o_uid;
                } else if ($routeParams.s_uid !== undefined) {
                    uid = $routeParams.s_uid;
                }

                CommentService.findCommentByUserId(uid).then(
                    function (res) {
                        vm.comments = res.data;
                    }
                );
            }
        }

    }
})();
