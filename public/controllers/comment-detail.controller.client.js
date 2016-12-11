(function () {
    angular
        .module('EmuStock')
        .controller('CommentDetailController', CommentDetailController);

    function CommentDetailController($routeParams, SharedService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.comment_id = $routeParams.cid;
            vm.main_comment = null;
            vm.following_comments = [];

            CommentService.getCommentById(vm.comment_id).then(
                res => vm.main_comment = res.data
            );

            CommentService.getCommentByReplyToId(vm.comment_id).then(
                res => vm.following_comments = res.data
            );
        }

    }
})
();
