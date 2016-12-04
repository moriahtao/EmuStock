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




/* Proposed usl
/user/:uid/self -> profle controller
/user/:uid/other -> user-detail controller

/user/search -> user-search controller
/user/followed -> user-list controller
/user/following -> user-list controller

/user/:uid/stocks -> stock-list controller
/stock/:symbol -> stock-detail controller
/stock/search -> stock-search controller

todo:
use following url:
    /self/:self_id/
    /self/:self_id/other/:other_id/
    /self/:self_id/stock/:symbol/

    /self/:self_id/other/:other_id/(following/followed/stocks)
 */