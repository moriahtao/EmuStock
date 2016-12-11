/**
 * Created by ChienliMa on 08/12/2016.
 * Created by ChienliMa on 01/12/2016.
 */

(function () {
    angular
        .module('EmuStock')
        .factory('CommentService', CommentService);

    function CommentService($http) {
        return {
            getCommentById : getCommentById,
            createComment : createComment,
            deleteCommentById : deleteCommentById,
            getTimelineByUserId : getTimelineByUserId,
            findCommentByStock : findCommentByStock,
            findCommentByUserId: findCommentByUserId,
        };

        function createComment(comment) {
            return $http.post("/api/comment", comment);
        }

        function getCommentById(cid) {
            return $http.get("/api/comment/" + cid);
        }

        function deleteCommentById(cid) {
            return $http.delete("/api/comment/" + cid);
        }

        function findCommentByStock(symbol) {
            return $http.get("/api/comment/stock/" + symbol);
        }

        function getTimelineByUserId(uid) {
            return $http.get("/api/user/" + uid + "/timeline");
        }

        function findCommentByUserId(uid) {
            return $http.get(`/api/user/${uid}/comments`);
        }
    }
})();
