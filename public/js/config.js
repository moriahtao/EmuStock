(function () {
    angular
        .module('EmuStock')
        .config(Config);

    function Config($routeProvider, SharedServiceProvider) {
        var maps = SharedServiceProvider.$get().maps;

        var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/user/loggedin').success(
                function (user) {
                    if (user) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                        $location.url('/');
                    }
                });
            return deferred.promise;
        };

        for (var key in maps) {
            var item = maps[key];
            $routeProvider
                .when(item.route, {
                    templateUrl: item.view,
                    controller: item.controller,
                    controllerAs: 'vm',
                    resolve: item.isPublic ? {} : {loggedin: checkLoggedin},
                });
        }

        $routeProvider
            .otherwise({
                redirectTo: maps.login.route,
            });
    }
})();


/* Proposed usl
 /self/:s_uid/ -> profle controller
 /self/:s_uid/other/:o_uid -> user-detail controller
 /self/:s_uid/search   -> user-search controller
 /self/:s_uid/stock/search -> stock-searchcontroller

 /self/:s_uid/followers  ||  /self/:s_uid/other/:o_uid／followers -> user-list controller
 /self/:s_uid/followings  ||  /self/:s_uid/other/:o_uid／followings -> user-list controller

 /self/:s_uid/stock  ||  /self/:s_uid/other/:o_uid／stock -> stock-list controller
 /self/:s_uid/stock/:symbol  ||  /self/:s_uid/other/:o_uid／stock/:symbol -> stock-detail controller


 .../comment/ -> comment-list contorller
 .../comment/:cid  -> comment-detail controller
 .../comment/new -> comment-create controller
 .../comment/:cid/edit -> comment-edit controller


 */
