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
            findCommentByUserId : findCommentByUserId,
            findCommentByStock : findCommentByStock,
        };

        function createComment(comment) {
            $http.post("/api/comment", comment)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function getCommentById(cid) {
            $http.get("/api/comment/" + cid)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function deleteCommentById(cid) {
            $http.delete("/api/comment/" + cid)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findCommentByStock(symbol) {
            $http.get("/api/comment/stock/" + symbol)
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }

        function findCommentByUserId(uid) {
            $http.get("/api/user/" + uid + "/timeline")
                .then(
                    function (res) {
                        return res.data;
                    }
                );
        }
    }
})();
