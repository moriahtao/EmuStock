/**
 * Created by ChienliMa on 01/12/2016.
 */
(function () {
    angular
        .module('EmuStock')
        .factory('UserService', UserService);

    function UserService($http) {
        return {
            register: register,
            searchUserByUsername: searchUserByUsername,
            findUserById: findUserById,
            updateUser: updateUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            followStock: followStock,
            unfollowStock: unfollowStock,
        };

        function register(user) {
            return $http.post('/api/user/register', user);
        }

        function searchUserByUsername(username) {
            $http.get("/api/user/?username=" + username);
        }

        function findUserById(uid) {
            return $http.get("/api/user/" + uid);
        }

        function updateUser(uid, user) {
            return $http.put("/api/user/" + uid, user);
        }

        function followUser(uid, f_uid) {
            return $http.post("/api/user/" + uid + "/follow/" + f_uid);
        }

        function unfollowUser(uid, f_uid) {
            return $http.delete("/api/user/" + uid + "/follow/" + f_uid);
        }

        function followStock(uid, symbol) {
            return $http.post("/api/user/" + uid + "/stock/" + symbol);
        }

        function unfollowStock(uid, symbol) {
            return $http.delete("/api/user/" + uid + "/stock/" + symbol);
        }
    }
})();
