/**
 * Created by ChienliMa on 01/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .factory('CommentService', CommentService);

    function CommentService($http) {
        return {
            createComment: createComment,
        };

        function createComment(comment) {
            return $http.post(`/api/comment/`, comment);
        }
    }
})();
