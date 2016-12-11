(function () {
    angular
        .module('EmuStock')
        .controller('CommentEditController', CommentEditController);

    function CommentEditController($routeParams, SharedService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm, init);

        function init() {
            vm.comment_id = $routeParams.cid;
            vm.comment = null;

            vm.update = update;

            CommentService.getCommentById(vm.comment_id).then(
                res => vm.comment = res.data
            );
        }


        function update() {
            CommentService.updateComment(vm.comment_id, vm.comment).then(
                () => console.log("update success"),
                () => console.warn("update failed")
            );
        }
    }
})();
