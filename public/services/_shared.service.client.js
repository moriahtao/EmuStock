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
                route: '/register',
                view: 'views/register.view.client.html',
                controller: 'RegisterController',
                isPublic: true
            },
            profile: {
                route: '/self/:s_uid',
                view: 'views/profile.view.client.html',
                controller: 'ProfileController',
            },
            user_detail: {
                route: '/self/:s_uid/other/:o_uid',
                view: 'views/profile.view.client.html',
                controller: 'ProfileController',
            },

            // users
            self_following: {
                route: '/self/:s_uid/following',
                view: 'views/following.view.client.html',
                controller: 'UserListController'
            },
            self_follower: {
                route: '/self/:s_uid/follower',
                view: 'views/follower.view.client.html',
                controller: 'UserListController'
            },
            other_following: {
                route: '/self/:s_uid/other/:o_uid／following',
                view: 'views/following.view.client.html',
                controller: 'UserListController'
            },
            other_follower: {
                route: '/self/:s_uid/other/:o_uid／follower',
                view: 'views/follower.view.client.html',
                controller: 'UserListController'
            },

            // stocks
            self_stock_detail: {
                route: '/self/:s_uid/stock/:symbol',
                view: 'views/stock-detail.view.client.html',
                controller: 'StockDetailController'
            },
            other_stock_detail: {
                route: '/self/:s_uid/other/:o_uid／stock/:symbol',
                view: 'views/stock-detail.view.client.html',
                controller: 'StockDetailController'
            },
            self_stocks: {
                route: '/self/:s_uid/stocks',
                view: 'views/my-stock.view.client.html',
                controller: 'StockListController'
            },
            other_stocks: {
                route: '/self/:s_uid/other/:o_uid／stocks',
                view: 'views/profile.view.client.html',
                controller: 'StockListController'
            },

            // comments
            timeline: {
                route: '/self/:s_uid/timeline',
                view: 'views/timeline.view.client.html',
                controller: 'CommentListController',
            },
            comment_details: {
                route: '/comment/:cid',
                view: 'views/timeline.view.client.html',
                controller: 'CommentDetailController',
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
            return maps[routeKey].route
            // match ":" plus non ("\" or "/" )one or more time
                .replace(/:([^\/]+)/g, function (_, key) {
                    return priorDict && key in priorDict ?
                        priorDict[key] : $routeParams[key];
                });
        }
    }
})();
