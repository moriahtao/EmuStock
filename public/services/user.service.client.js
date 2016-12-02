/**
 * Created by ChienliMa on 01/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .factory('UserService', UserService)

    function UserService($http) {
        return {
            searchUserByUsername : function(username) {
                return $http.get("/api/user/?username=" + username);
            },

            findUserById : function(uid) {
                return $http.get("/api/user/" + uid);
            },

            updateUser : function (uid, user) {
                return $http.post("/api/user/" + uid, user);
            },

            followUser : function(uid, f_uid) {
                return $http.post("/api/user/" + uid + "/follow/" + f_uid);
            },

            unfollowUser : function(uid, f_uid) {
                return $http.delete("/api/user/" + uid + "/follow/" + f_uid);
            },

            followStock : function(uid, symbol) {
                return $http.post("/api/user/" + uid + "/stock/" + symbol);
            },

            unfollowStock : function(uid, symbol) {
                return $http.delete("/api/user/" + uid + "/stock/" + symbol);
            }
        }
    }

})();
