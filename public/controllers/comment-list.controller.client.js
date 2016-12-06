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

    function CommentListController($routeParams, UserService, StockService) {
        var vm = this;
        vm.comments = null;

        if ($routeParams.params.uid != undefined) {
            vm.uid = $routeParams.params.uid;
            UserService.getCommentsByUser(vm.uid).then(
                function (res) {
                    vm.comments = res.data;
                }
            );
        } else if ($routeParams.params.symbol != undefined) {
            vm.symbol = $routeParams.params.symbol;
            StockService.getCommentsByStock(vm.symbol).then(
                function (res) {
                    vm.comments = res.data;
                }
            );
        }


    }
})();
