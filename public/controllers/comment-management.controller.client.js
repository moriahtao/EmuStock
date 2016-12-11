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
        .controller('CommentManagementController', CommentManagementController);

    function CommentManagementController($routeParams, SharedService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            CommentService.findCommentByUserId($routeParams.o_uid).then(
                res => vm.comments = res.data
            );
            vm.deleteComment = deleteComment;
        }

        function deleteComment(c_id) {
            CommentService.deleteCommentById(c_id)
                .then(
                    () => {
                        vm.comments = vm.comments.filter((x) => x._id != c_id);
                    },
                    err => {
                        alert("operation failed:" + err);
                    }
                )
        }

    }
})();
