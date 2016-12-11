(function () {
    angular
        .module('EmuStock')
        .controller('CommentEditController', CommentEditController);

    function CommentEditController($routeParams, SharedService, CommentService) {
        const vm = this;
        vm.shared = SharedService;
        vm.shared.initController(vm);

        vm.comment_id = $routeParams.cid;
        vm.comment = null;

        CommentService.getCommentById(vm.comment_id)
            .then(
                function(res) {
                    vm.comment = res.data;
                }
            );

        function update() {
            CommentService.updateComment(vm.comment_id, vm.comment)
                .then(
                    function() {
                        console.log("update success");
                    },
                    function () {
                        console.warn("update failed");
                    }
                );
        }
    }
})();
