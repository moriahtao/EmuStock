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

    function CommentListController($routeParams, CommentService) {
        var vm = this;
        vm.comments = null;

        if ($routeParams.params.uid != null) {
            vm.uid = $routeParams.params.uid;
            CommentService.getCommentByUser(vm.uid)
                .then(
                    function(res) {
                        vm.comments = res.data;
                    }
                );
        } else if ($routeParams.params.symbol != null) {
            vm.symbol = $routeParams.params.symbol;
            CommentService.getCommentByStock(vm.symbol)
                .then(
                    function(res) {
                        vm.comments = res.data;
                    }
                );
        }


    }
})();
