(function () {
    angular
        .module('EmuStock')
        .controller('CommentDetailController', CommentDetailController);

    function CommentDetailController($routeParams, SharedService, CommentService) {
        var vm = this;
        vm.shared = SharedService;
        vm.comment_id = $routeParams.cid;
        vm.main_comment = null;
        vm.following_comments = [];

        CommentService.getCommentById(vm.comment_id)
            .then(
                function(res) {
                    vm.main_comment = res.data;
                }
            );

        CommentService.getCommentByReplyToId(vm.comment_id)
            .then(
                function(res) {
                    vm.following_comments = res.data;
                }
            );
    }
})();
