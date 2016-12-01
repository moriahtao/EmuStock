(function () {
    angular
        .module("EmuStock")
        .factory("SharedService", SharedService);

    function SharedService($routeParams) {
        var maps = {
            login: {
                route: '/login',
                view: 'views/login.view.client.html',
                controller: 'LoginController',
                isPublic: true
            },
            register: {
                route:'/register',
                view: 'views/register.view.client.html',
                controller: 'RegisterController',
            },
            profile: {
                route: '/profile',
                view: 'views/profile.view.client.html',
                controller: 'ProfileController',
            },
            timeline: {
                route: '/timeline',
                view: 'views/timeline.view.client.html',
                controller: 'TimelineController',
            },
            stocks: {
                route: '/stocks',
                view: 'views/stocks.view.client.html',
                controller: 'StocksController',
            }
        };

        return {
            maps: maps,
            getRoute: getRoute,
        };

        /*
         * Dynamically convert route pattern into real url
         * Example:
         * in: website_edit
         * out: /user/123/website/456, when :uid=123 and :wid=456
         * note: priorDict is used to map keys prior to $routeParams
         * */
        function getRoute(routeKey, priorDict) {
            return maps[routeKey].route.replace(/:([^\/]+)/g, function (_, key) {
                return priorDict && key in priorDict ?
                    priorDict[key] : $routeParams[key];
            });
        }

    }
})();
