(function () {
    angular
        .module('EmuStock')
        .config(Config);

    function Config($routeProvider, SharedServiceProvider) {
        var maps = SharedServiceProvider.$get().maps;

        for (var key in maps) {
            var item = maps[key];
            $routeProvider
                .when(item.route, {
                    templateUrl: item.view,
                    controller: item.controller,
                    controllerAs: 'vm',
                    resolve: item.isPublic ? {} : {},
                });
        }

        $routeProvider
            .otherwise({
                redirectTo: maps.login.route,
            });
    }
})();
