(function () {
    angular
        .module("EmuStock")
        .directive('navBar', Header)

    function Header() {
        return {
            templateUrl: '/views/_header.view.client.html'
        };
    }

})();
