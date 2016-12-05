(function () {
    angular
        .module('EmuStock')
        .controller('CommentCreateController', CommentCreateController);

    function CommentCreateController($routeParams, CommentService) {
        var vm = this;
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
