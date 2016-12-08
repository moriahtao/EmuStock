(function () {
    angular
        .module('EmuStock')
        .controller('CommentCreateController', CommentCreateController);

    function CommentCreateController($routeParams, SharedService, CommentService) {
        var vm = this;
        vm.shared = SharedService;
        vm.comment = null;

        function create() {
            CommentService.createComment(vm.comment)
                .then(
                    function (res) {

                    }
                );
        }

    }
})();
