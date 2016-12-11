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
            currentUser: currentUser,
            updateUser: updateUser,
            followUser: followUser,
            unfollowUser: unfollowUser,
            followStock: followStock,
            unfollowStock: unfollowStock,
            login: login,
            logout: logout,
            getTimelineByUserId: getTimelineByUserId,
        };

        function login(user) {
            return $http.post("/api/user/login", user);
        }

        function logout() {
            return $http.post("/api/user/logout");
        }

        function register(user) {
            return $http.post('/api/user/register', user);
        }

        function searchUserByUsername(username) {
            $http.get(`/api/user/?username=${username}`);
        }

        function findUserById(uid) {
            return $http.get(`/api/user/${uid}`);
        }

        function currentUser() {
            return $http.get("api/user/current");
        }

        function updateUser(user) {
            return $http.put("/api/user/update", user);
        }

        function followUser(uid, f_uid) {
            return $http.post(`/api/user/${uid}/follow/${f_uid}`);
        }

        function unfollowUser(uid, f_uid) {
            return $http.delete(`/api/user/${uid}/follow/${f_uid}`);
        }

        function followStock(uid, symbol) {
            return $http.post(`/api/user/${uid}/stock/${symbol}`);
        }

        function unfollowStock(uid, symbol) {
            return $http.delete(`/api/user/${uid}/stock/${symbol}`);
        }

        function getTimelineByUserId(userId) {
            return $http.get(`/api/user/${userId}/timeline/`);
        }
    }
})();
