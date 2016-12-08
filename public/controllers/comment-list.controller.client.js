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

    function CommentListController($routeParams, SharedService, UserService, StockService) {
        var vm = this;
        vm.shared = SharedService;
        vm.comments = null;

        if ($routeParams.s_uid !== undefined) {
            var uid = $routeParams.s_uid;
            UserService.getCommentsByUser(uid).then(
                function (res) {
                    vm.comments = res.data;
                }
            );
        } else if ($routeParams.symbol !== undefined) {
            var symbol = $routeParams.symbol;
            StockService.getCommentsByStock(symbol).then(
                function (res) {
                    vm.comments = res.data;
                }
            );
        }


    }
})();
