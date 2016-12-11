(function () {
    angular
        .module("EmuStock")
        .factory("SharedService", SharedService);

    function SharedService($location, $routeParams, UserService) {
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
                view: 'views/other-user-detail.view.client.html',
                controller: 'UserDetailController',
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
            stock_search: {
                route: '/self/:s_uid/stock/search',
                view: 'views/stock-search.view.client.html',
                controller: 'StockSearchController'
            },
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
                view: 'views/comment-list.view.client.html',
                controller: 'CommentListController',
            },
            self_comments: {
                route: '/self/:s_uid/comments',
                view: 'views/comment-list.view.client.html',
                controller: 'CommentListController',
            },
            other_comments: {
                route: '/self/:s_uid/other/:o_uid/comments',
                view: 'views/comment-list.view.client.html',
                controller: 'CommentListController',
            },
            stock_comments: {
                route: '/self/:s_uid/stock/:symbol/comments',
                view: 'views/comment-list.view.client.html',
                controller: 'CommentListController',
            },
            // comment_details: {
            //     route: '/comment/:cid',
            //     view: 'views/comment-list.view.client.html',
            //     controller: 'CommentDetailController',
            // }
        };

        return {
            maps: maps,
            getRoute: getRoute,
            initController: initController,
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

        /*
         * Initialize given view controller, then callback after finishing
         * get the following properties:
         *  - vm.user
         *  - vm.logout
         */
        function initController(vm, callback) {
            vm.user = {};
            vm.logout = logout;

            UserService.findUserById($routeParams.s_uid).then(
                res => {
                    vm.user = res.data;
                    if (callback !== undefined) callback();
                },
                err => console.warn("error fetch user profile: " + err)
            );

            function logout() {
                UserService.logout().then(
                    () => {
                        console.log('logout succeeded');
                        $location.url(getRoute('login'));
                    },
                    () => console.warn('logout failed, please try again later')
                );
            }
        }
    }
})
();
