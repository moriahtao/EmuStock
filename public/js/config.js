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

        $.each(maps, (_, item) => {
            $routeProvider
                .when(item.route, {
                    templateUrl: item.view,
                    controller: item.controller,
                    controllerAs: 'vm',
                    // TODO: uncomment this
                    // resolve: item.isPublic ? {} : {loggedin: checkLoggedin},
                });
        });

        $routeProvider
            .otherwise({
                redirectTo: maps.login.route,
            });
    }
})();
