(function () {
    angular
        .module('EmuStock')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'views/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'vm',
            })
            .otherwise({
                redirectTo: '/home',
            });
    }
})();
